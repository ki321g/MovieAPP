import React, { useState, useCallback, useEffect } from "react";
import { BaseTvShowProps, Review } from "../types/interfaces";
import { db, auth } from '../config/firebase';
import { ref } from 'firebase/storage';
import { getTVShow } from '../api/tmdb-api';
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

interface TVShowContextInterface {
    favourites: number[];
    mustWatch: number[],
    addToFavourites: ((tvShow: BaseTvShowProps) => void);
    getFavourites: (() => void);
    removeFromFavourites: ((tvShow: BaseTvShowProps) => void);
    clearFavourites: (() => void);
    addReview: ((tvShow: BaseTvShowProps, review: Review) => void);
    getPlaylists: (() => void);
    addToPlaylist: ((tvShow: BaseTvShowProps) => void);
}
const initialContextState: TVShowContextInterface = {
    favourites: [],
    mustWatch: [],
    addToFavourites: () => {},
    getFavourites: () => {},
    removeFromFavourites: () => {},
    clearFavourites: () => {},
    addReview: (tvShow, review) => { tvShow.id, review},
    getPlaylists: () => {},
    addToPlaylist: () => {},
};

export const TVShowContext = React.createContext<TVShowContextInterface>(initialContextState);;

const TVShowContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [favourites, setFavourites] = useState<number[]>([]);
    const [playlists, setPlaylists] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);
    const favouriteTVShowsRef = collection(db, 'tvShowFavourites');
    const tvShowsPlaylistRef = collection(db, 'tvShowPlaylists');

    const getFavourites = async () => {
        try {
            if (auth?.currentUser?.uid) {
                const favouriteTVShows = await getFavouritesTVShowsList();
                const favouriteTVShowsIds = favouriteTVShows.map(tvShow => tvShow.tvShow_id);
                setFavourites(favouriteTVShowsIds);
            } else {
                setFavourites([]); // Clear favourites when the user is not authenticated
            }
            
        } catch (err) {
            console.error(err);
        };
    }

    const getFavouritesTVShowsList = async () => {
        try {
            const result = query(favouriteTVShowsRef, where("userId", "==", auth?.currentUser?.uid));
            const favouriteTVShows = await getDocs(result);
            const filteredfavouriteTVShows = favouriteTVShows.docs.map((doc) => ({                    
                id: doc.id,
                ...doc.data(),
            }));

            return(filteredfavouriteTVShows);
            
        } catch (err) {
            console.error(err);
        };
    }

    const addToFavourites = useCallback(async (tvShow: BaseTvShowProps) => {
        try {
            console.log("tvShow.id")
            console.log(tvShow.id)
            const tvShowIdToCheck = tvShow.id;
            console.log(tvShowIdToCheck);
            const favouriteTVShows = await getFavouritesTVShowsList();
            const isFavourite = favouriteTVShows.find(favTVShow => favTVShow.tvshow_id === tvShowIdToCheck);

            console.log(isFavourite);

            if (isFavourite) {
                console.log('The movie is in the favourites list');
                const favouriteTVShowsIds = favouriteTVShows.map(tvShow => tvShow.tvshow_id);
                setFavourites(favouriteTVShowsIds);
                return favourites;
                
            } else {
                console.log('The movie is not in the favourites list');
                // Add the movie to favourites
                await addDoc(favouriteTVShowsRef, {
                    tvshow_id: tvShow.id,
                    tvshow_name: tvShow.name,
                    userId: auth?.currentUser?.uid,
                });

                const latestfavouriteTVShows = await getFavouritesTVShowsList();
                const favouriteTVShowsIds = latestfavouriteTVShows.map(tvShow => tvShow.tvshow_id);
                setFavourites(favouriteTVShowsIds);
                return favourites;
            }
        } catch (error) {
          // Handle any errors
          console.error('Error adding to favourites:', error);
        }
    }, []);

    const removeFromFavourites = useCallback(async (tvShow: BaseTvShowProps) => {

        try {
            const favouriteTVShows = await getFavouritesTVShowsList();
            const movieToRemove = favouriteTVShows.find(favTVShow => favTVShow.tvshow_id === tvShow.id);

            if (movieToRemove) {
                await deleteDoc(doc(favouriteTVShowsRef, movieToRemove.id));
                setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== tvShow.id));
            }
        } catch (error) {
            console.error('Error removing from favourites:', error);
        }
    }, []);

    const addReview = (tvShow:BaseTvShowProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [tvShow.id]: review } )
    };

    const addToPlaylist = useCallback((tvShow: BaseTvShowProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(tvShow.id)) {
                const newMustWatch = [...prevMustWatch, tvShow.id];
                console.log(newMustWatch);
                return [...prevMustWatch, tvShow.id];
            }
            return prevMustWatch;
        });
    }, []);
    const getPlaylists = async () => {
        const playlistTVShows = await getPlaylistsTVShows();
        return(playlistTVShows);
    };
    const getPlaylistsTVShows = async () => {
        try {
            
            const result = query(tvShowsPlaylistRef, where("userId", "==", auth?.currentUser?.uid));
            const playlistTVShows = await getDocs(result);
            const filteredPlaylistTVShows = playlistTVShows.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const updatedPlaylistTVShows = await Promise.all(
                filteredPlaylistTVShows.map(async (tvShow) => {
                  const tvShowDetails = await getTVShow(tvShow.id);
                  return { ...tvShow, details: tvShowDetails };
                })
            );
            
            console.log(updatedPlaylistTVShows);
            return(updatedPlaylistTVShows);
        } catch (err) {
            console.error(err);
        };
    }

    const clearFavourites = () => {
        console.log('clearFavourites');
        setFavourites([]); // Clear the favourites
    };

    return (
        <TVShowContext.Provider
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
        </TVShowContext.Provider>
    );
};

export default TVShowContextProvider;