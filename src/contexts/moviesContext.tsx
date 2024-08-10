import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";
import { db, auth } from '../config/firebase';
import { getMovie } from '../api/tmdb-api';
import { 
    getDocs, 
    query, 
    where,
    collection, 
    addDoc, 
    deleteDoc,
    doc 
} from 'firebase/firestore';

interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[],
    addToFavourites: ((movie: BaseMovieProps) => void);
    getFavourites: (() => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    clearFavourites: (() => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);
    getPlaylists: (() => void);
    addToPlaylist: ((movie: BaseMovieProps) => void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [],
    addToFavourites: () => {},
    getFavourites: () => {},
    removeFromFavourites: () => {},
    clearFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},
    getPlaylists: () => {},
    addToPlaylist: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [favourites, setFavourites] = useState<number[]>([]);
    // const [playlists, setPlaylists] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);

    const favouriteMovieRef = collection(db, 'favourites');
    const moviePlaylistRef = collection(db, 'playlists');


    const getFavourites = async () => {
        try {
            if (auth?.currentUser?.uid) {
                const favouriteMovies: any = await getFavouritesMovieList();
                const favouriteMovieIds: any = favouriteMovies.map((movie: any) => movie.movie_id);
                
                setFavourites(favouriteMovieIds);
            
            } else {
                setFavourites([]); // Clear favourites when the user is not authenticated
            }
            
        } catch (err) {
            console.error(err);
        };
    }

    const getFavouritesMovieList = async () => {
        try {
            const result = query(favouriteMovieRef, where("userId", "==", auth?.currentUser?.uid));
            const favouriteMovies = await getDocs(result);
            const filteredFavouriteMovies = favouriteMovies.docs.map((doc) => ({                    
                id: doc.id,
                ...doc.data(),
            }));
            
            return(filteredFavouriteMovies);
            
        } catch (err) {
            console.error(err);
        };
    }

    const addToFavourites = useCallback(async (movie: BaseMovieProps) => {
        try {
            const movieIdToCheck = movie.id;          
            const favouriteMovies = await getFavouritesMovieList();
            const isFavourite: any = favouriteMovies?.find((favMovie: any) => favMovie.movie_id === movieIdToCheck);

            if (isFavourite) {
                console.log('The movie is in the favourites list');
                const favouriteMovieIds: any  = favouriteMovies?.map((movie: any) => movie.movie_id);
                setFavourites(favouriteMovieIds);
                return favourites;
              } else {
                console.log('The movie is not in the favourites list');
                // Add the movie to favourites
                await addDoc(favouriteMovieRef, {
                    movie_id: movie.id,
                    movie_title: movie.title,
                    userId: auth?.currentUser?.uid,
                });

                const latestFavouriteMovies = await getFavouritesMovieList();
                const favouriteMovieIds: any = latestFavouriteMovies?.map((movie: any) => movie.movie_id);
                setFavourites(favouriteMovieIds);
                return favourites;
              }

        } catch (error) {
          // Handle any errors
          console.error('Error adding to favourites:', error);
        }
      }, []);

    const removeFromFavourites = useCallback(async (movie: BaseMovieProps) => {
        try {
            const favouriteMovies = await getFavouritesMovieList();
            const movieToRemove: any = favouriteMovies?.find((favMovie: any) => favMovie.movie_id === movie.id);

            if (movieToRemove) {
                await deleteDoc(doc(favouriteMovieRef, movieToRemove.id));
                setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
            }
        } catch (error) {
            console.error('Error removing from favourites:', error);
        }
    }, []);

    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } );
        console.log(myReviews);
      };

    const addToPlaylist = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(movie.id)) {
                const newMustWatch = [...prevMustWatch, movie.id];
                console.log(newMustWatch);
                return [...prevMustWatch, movie.id];
            }
            return prevMustWatch;
        });
    }, []);

    const getPlaylists = async () => {
        const playlistMovies = await getPlaylistsMovies();
        // console.log(playlistMovies);
        return(playlistMovies);
    };

    const getPlaylistsMovies = async () => {
        try {
            
            const result = query(moviePlaylistRef, where("userId", "==", auth?.currentUser?.uid));
            const playlistMovies = await getDocs(result);
            const filteredPlaylistMovies = playlistMovies.docs.map((doc) => ({                    
                id: doc.id,
                ...doc.data(),
            }));         
            
            // const moviePromises = filteredPlaylistMovies.map(movieId => getMovie(movieId));
            // const movies = await Promise.all(moviePromises);

            const updatedPlaylistMovies = await Promise.all(
                filteredPlaylistMovies.map(async (movie) => {
                  const movieDetails = await getMovie(movie.id);
                  return { ...movie, details: movieDetails };
                })
              );
            
            console.log(updatedPlaylistMovies);
            return(updatedPlaylistMovies);
        } catch (err) {
            console.error(err);
        };
    }

    const clearFavourites = () => {
        console.log('clearFavourites');
        setFavourites([]); // Clear the favourites
      };

       
    // useEffect(() => {
    //       getPlaylists();
    //     }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                mustWatch,
                addToFavourites,
                getFavourites,
                addToPlaylist,
                removeFromFavourites,
                clearFavourites,
                addReview,
                getPlaylists,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;