import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";
import { db, auth } from '../config/firebase';
import { ref } from 'firebase/storage';
import { getMovie } from '../api/tmdb-api';
import { 
    getDocs, 
    query, 
    where,
    collection, 
    addDoc, 
    deleteDoc, 
    updateDoc,
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

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);;

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [favourites, setFavourites] = useState<number[]>([]);
    const [playlists, setPlaylists] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    // const [favouritesMovieList, setFavouritesMovieList] = useState([]);
    const favouriteMovieRef = collection(db, 'favourites');
    const moviePlaylistRef = collection(db, 'playlists');

    // Log favourites state whenever it changes
    // useEffect(() => {
    //     console.log("favouritesMovieList - Start");
    //     console.log(favouritesMovieList);
    //     console.log("favouritesMovieList - END");
    //     }, [favouritesMovieList]);
    // useEffect(() => {
    //     getFavouritesMovieList();
    // }, []);

    const getFavourites = async () => {
        try {
            if (auth?.currentUser?.uid) {
                const favouriteMovies = await getFavouritesMovieList();
                const favouriteMovieIds = favouriteMovies.map(movie => movie.movie_id);
                setFavourites(favouriteMovieIds);
            //return favourites;
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
            // setFavouritesMovieList(filteredFavouriteMovies);
            // console.log(filteredFavouriteMovies);   
            // const movieIds = filteredFavouriteMovies.map(movie => Number(movie.movieid));
            // console.log(movieIds);            
            // setFavourites(movieIds);
            return(filteredFavouriteMovies);
            
        } catch (err) {
            console.error(err);
        };
    }

    const addToFavourites = useCallback(async (movie: BaseMovieProps) => {
        try {
            console.log("movie.id")
            console.log(movie.id)
            const movieIdToCheck = movie.id;
            console.log(movieIdToCheck);
            const favouriteMovies = await getFavouritesMovieList();
            const isFavourite = favouriteMovies.find(favMovie => favMovie.movie_id === movieIdToCheck);

            console.log(isFavourite);


            if (isFavourite) {
                console.log('The movie is in the favourites list');
                const favouriteMovieIds = favouriteMovies.map(movie => movie.movie_id);
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
                const favouriteMovieIds = latestFavouriteMovies.map(movie => movie.movie_id);
                setFavourites(favouriteMovieIds);
                return favourites;
                // setFavourites((prevFavourites) => [...prevFavourites, movie.id]);
          
              }
          
        //    setFavourites((prevFavourites) => {
        //           if (!prevFavourites.includes(movie.id)) {
        //               return [...prevFavourites, movie.id];
        //           }
        //           return prevFavourites;
        //       });
          
        } catch (error) {
          // Handle any errors
          console.error('Error adding to favourites:', error);
        }
      }, []);

    // const addToFavourites = useCallback((movie: BaseMovieProps) => {

    //     // console.log("FavouriteMoviesPage: ", auth?.currentUser?.uid);
    //     // console.log("FavouriteMoviesPage: ", auth?.currentUser?.accessToken);

    //     getFavouritesMovieList();
    //     console.log(favouritesMovieList);
    //     // console.log(favouritesMovieList);
    //     // try {
    //     //     await addDoc(moviesCollectionRef, {
    //     //         title: newMovieTitle,
    //     //         releaseDate: newMovieReleaseDate,
    //     //         receivedAnOscar: newMovieReceivedAnOscar,
    //     //         userId: auth?.currentUser?.uid,
    //     //     });
    //     //     getMovieList();
    //     // } catch (err) {
    //     //     console.error(err);
    //     // }

    //     setFavourites((prevFavourites) => {
    //         if (!prevFavourites.includes(movie.id)) {
    //             return [...prevFavourites, movie.id];
    //         }
    //         return prevFavourites;
    //     });
    // }, []);

    const removeFromFavourites = useCallback(async (movie: BaseMovieProps) => {
        // try {
        //     const favouriteMovieDoc = doc(db, 'favourites', movie.id);
        //     await deleteDoc(favouriteMovieDoc);
        //     setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
        // } catch (err) {
        //     console.error(err);
        // };
        try {
            const favouriteMovies = await getFavouritesMovieList();
            const movieToRemove = favouriteMovies.find(favMovie => favMovie.movie_id === movie.id);

            if (movieToRemove) {
                await deleteDoc(doc(favouriteMovieRef, movieToRemove.id));
                setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
            }
        } catch (error) {
            console.error('Error removing from favourites:', error);
        }
    }, []);

    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
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
        retrun(playlistMovies);
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
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;