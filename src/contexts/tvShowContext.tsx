import React, { useState, useCallback } from "react";
import { BaseTvShowProps, Review } from "../types/interfaces";
import { db, auth } from '../config/firebase';

// import { getTVShow } from '../api/tmdb-api';
import { 
    getDocs, 
    query, 
    where,
    collection, 
    addDoc, 
    deleteDoc,
    doc 
} from 'firebase/firestore';

interface TVShowContextInterface {
    favourites: number[];
    // mustWatch: number[],
    addToFavourites: ((tvShow: BaseTvShowProps) => void);
    getFavourites: (() => void);
    removeFromFavourites: ((tvShow: BaseTvShowProps) => void);
    clearFavourites: (() => void);
    addReview: ((tvShow: BaseTvShowProps, review: Review) => void);
    // getPlaylists: (() => void);
    // addToPlaylist: ((tvShow: BaseTvShowProps) => void);
}
const initialContextState: TVShowContextInterface = {
    favourites: [],
    // mustWatch: [],
    addToFavourites: () => {},
    getFavourites: () => {},
    removeFromFavourites: () => {},
    clearFavourites: () => {},
    addReview: (tvShow, review) => { tvShow.id, review},
    // getPlaylists: () => {},
    // addToPlaylist: () => {},
};

export const TVShowContext = React.createContext<TVShowContextInterface>(initialContextState);

const TVShowContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>([]);
    const [favourites, setFavourites] = useState<number[]>([]);
    // const [playlists, setPlaylists] = useState<number[]>([]);
    // const [mustWatch, setMustWatch] = useState<number[]>([]);
    const favouriteTVShowsRef = collection(db, 'tv_favourites');
    // const tvShowsPlaylistRef = collection(db, 'tv_playlists');

    const getFavourites = async () => {
        try {
            if (auth?.currentUser?.uid) {
                const favouriteTVShows = await getFavouritesTVShowsList();                
                const favouriteTVShowsIds: any = favouriteTVShows?.map((tvShow: any) => tvShow.tvShow_id) || [];
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
            
            const tvShowIdToCheck = tvShow.id;
            const favouriteTVShows = await getFavouritesTVShowsList();            
            const isFavourite: any = favouriteTVShows?.find((favTVShow: any) => favTVShow.movie_id === tvShowIdToCheck);
            console.log(isFavourite);

            if (isFavourite) {
                console.log('The TV Show is in the favourites list');
                // const favouriteTVShowsIds: any  = favouriteTVShows?.map((tvShow: any) => tvShowIdToCheck);
                const favouriteTVShowsIds: any = favouriteTVShows?.map(() => tvShowIdToCheck);
                setFavourites(favouriteTVShowsIds);
                return favourites;
                
            } else {
                console.log('The TV Show is not in the favourites list');
                // Add the movie to favourites
                await addDoc(favouriteTVShowsRef, {
                    tvshow_id: tvShow.id,
                    tvshow_name: tvShow.name,
                    userId: auth?.currentUser?.uid,
                });

                const latestfavouriteTVShows = await getFavouritesTVShowsList();
                const favouriteTVShowsIds: any = latestfavouriteTVShows?.map((tvShow: any) => tvShow.tvshow_id);
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
            const tvShowToRemove: any = favouriteTVShows?.find((favTVShow: any) => favTVShow.movie_id === tvShow.id);

            if (tvShowToRemove) {
                await deleteDoc(doc(favouriteTVShowsRef, tvShowToRemove.id));
                setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== tvShow.id));
            }
        } catch (error) {
            console.error('Error removing from favourites:', error);
        }
    }, []);

    const addReview = (tvShow:BaseTvShowProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [tvShow.id]: review } )
    };

    // const addToPlaylist = useCallback((tvShow: BaseTvShowProps) => {
    //     setMustWatch((prevMustWatch) => {
    //         if (!prevMustWatch.includes(tvShow.id)) {
    //             const newMustWatch = [...prevMustWatch, tvShow.id];
    //             console.log(newMustWatch);
    //             return [...prevMustWatch, tvShow.id];
    //         }
    //         return prevMustWatch;
    //     });
    // }, []);
    
    // const getPlaylists = async () => {
    //     const playlistTVShows = await getPlaylistsTVShows();
    //     return(playlistTVShows);
    // };

    // const getPlaylistsTVShows = async () => {
    //     try {
            
    //         const result = query(tvShowsPlaylistRef, where("userId", "==", auth?.currentUser?.uid));
    //         const playlistTVShows = await getDocs(result);
    //         const filteredPlaylistTVShows = playlistTVShows.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));

    //         const updatedPlaylistTVShows = await Promise.all(
    //             filteredPlaylistTVShows.map(async (tvShow) => {
    //               const tvShowDetails = await getTVShow(tvShow.id);
    //               return { ...tvShow, details: tvShowDetails };
    //             })
    //         );
            
    //         console.log(updatedPlaylistTVShows);
    //         return(updatedPlaylistTVShows);
    //     } catch (err) {
    //         console.error(err);
    //     };
    // }

    const clearFavourites = () => {
        console.log('clearFavourites');
        setFavourites([]); // Clear the favourites
    };

    return (
        <TVShowContext.Provider
            value={{
                favourites,
                // mustWatch,
                addToFavourites,
                getFavourites,
                // addToPlaylist,
                removeFromFavourites,
                clearFavourites,
                addReview,                
            }}
        >
            {children}
        </TVShowContext.Provider>
    );
};

export default TVShowContextProvider;