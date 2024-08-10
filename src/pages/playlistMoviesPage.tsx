import React, {  useEffect } from "react"
import { getMovie } from "../api/tmdb-api";
import { db, auth } from '../config/firebase';
import { 
    getDocs, 
    query, 
    where,
    collection,
} from 'firebase/firestore';

const PlaylistMoviesPage: React.FC = () => {
   
    const moviePlaylistRef = collection(db, 'playlists');

  
  useEffect(() => {
    // Fetch the favourites here and update the state

    getPlaylistsMovies();

    
  }, []);

  const getPlaylistsMovies = async () => {
    try {
        
        const result = query(moviePlaylistRef, where("userId", "==", auth?.currentUser?.uid));
        const playlistMovies = await getDocs(result);
        const filteredPlaylistMovies: any = playlistMovies.docs.map((doc) => ({                    
            id: doc.id,
            ...doc.data(),
        }));         
        // console.log(filteredPlaylistMovies);
        // const moviePromises = filteredPlaylistMovies.map((movieId: any) => getMovie(movieId));
        // const movies = await Promise.all(moviePromises);

        const updatedPlaylistMovies = await Promise.all(
            filteredPlaylistMovies?.map(async (movie: any) => {
              const movieDetails = await getMovie(movie.movie_id);
              return { ...movie, details: movieDetails };
            })
          );
        
        // console.log(updatedPlaylistMovies);
        console.log(JSON.stringify(updatedPlaylistMovies, null, 2));
        return(updatedPlaylistMovies);
    } catch (err) {
        console.error(err);
    };
}
  

  return (
    <>
     
      
    </>
  );
};

export default PlaylistMoviesPage;