import React, { useState, useEffect } from "react";  // Changed
import Header from "../components/headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../components/movieList";
import { BaseMovieListProps, BaseMovieProps } from "../types/interfaces";

const styles = {
  root: {
    padding: "20px",
  },
};

const MovieListPage: React.FC= () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json.results);
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList movies={movies}></MovieList> 
      </Grid>
    </Grid>
  );
};
export default MovieListPage;