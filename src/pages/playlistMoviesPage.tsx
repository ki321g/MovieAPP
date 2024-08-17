import React, {  useEffect,useState } from "react"
import { getMovie } from "../api/tmdb-api";
import { db, auth } from '../config/firebase';
import { 
    getDocs, 
    query, 
    where,
    collection,
} from 'firebase/firestore';
import { BaseMovieProps, PlaylistProps } from '../types/interfaces';
import PageTemplate from '../components/templateMovieListPage';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'

const styles = {
  root: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
      background: "#141414",
      boxShadow: 'none',
      paddingBottom: '20px',
  },
};

const PlaylistMoviesPage: React.FC = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState('All');
  const moviePlaylistRef = collection(db, 'playlists');
  const [updatedPlaylistMovies, setUpdatedPlaylistMovies] = useState<PlaylistProps[]>([]);  
  const [playlistMovies, setPlaylistMovies] = useState<PlaylistProps[]>([]);  
  const [displayMovies, setDisplayMovies] = useState<BaseMovieProps[]>([]);

  useEffect(() => {
    // Fetch the favourites here and update the state
    getPlaylistsMovies();

    
  }, []);

  const handleChange = (event: any) => {
    setSelectedPlaylist(event.target.value);
  };

const getPlaylistsMovies = async () => {
    try {
      const result = query(moviePlaylistRef, where("userId", "==", auth?.currentUser?.uid));
      const playlistMovies = await getDocs(result);

      const filteredPlaylistMovies: any = playlistMovies.docs.map((doc) => ({                    
          id: doc.id,
          ...doc.data(),
      }));         

      const newPlaylistMovies = await Promise.all(
        filteredPlaylistMovies?.map(async (movie: any) => {
          const movieDetails = await getMovie(movie.movie_id);
          return { ...movie, results: movieDetails };
        })
      );

      const uniquePlaylistMovies = newPlaylistMovies.filter((newMovie, index, self) =>
        index === self.findIndex((movie) => movie.playlist_name === newMovie.playlist_name)
      );

      const allMovies = newPlaylistMovies.flatMap(movie => movie.results);

      const uniqueMovies = allMovies.filter((movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id)
      );

      setUpdatedPlaylistMovies(uniquePlaylistMovies);
      setPlaylistMovies(newPlaylistMovies);  
      setDisplayMovies(uniqueMovies);
    } catch (err) {
      console.error(err);
    };
  };

  const selectedMovies = selectedPlaylist === 'ALL' 
  ? playlistMovies.flatMap(movie => movie.results)
  : playlistMovies.filter(movie => movie.playlist_name === selectedPlaylist).flatMap(movie => movie.results);

  return (
    <>
      <Paper component="div" sx={styles.root}>
        <Grid container sx={{ paddingX: 60 }}>
					<Grid item xs>
						<Typography variant="h4" component="h3" align="center">
						  Movie Playlists
						</Typography>
					</Grid>
					<Grid item>        
            <Select
                color="secondary"
                value={selectedPlaylist}
                onChange={handleChange}
              >
                <MenuItem value="All">All</MenuItem>
                {updatedPlaylistMovies.map((movie) => (
                <MenuItem key={movie.playlist_name} value={movie.playlist_name}>
                  {movie.playlist_name}
                </MenuItem>
              ))}
              </Select>
					</Grid>				
				</Grid>
			</Paper>
      <PageTemplate
          movies={selectedPlaylist === 'All' ? displayMovies : selectedMovies}
          action={(movie: BaseMovieProps) => {
            return (
              <>
                <AddToFavouritesIcon {...movie} />
                <AddToPlaylistIcon {...movie} />
              </>
            );
          }}
      />
    </>
  );
};

export default PlaylistMoviesPage;