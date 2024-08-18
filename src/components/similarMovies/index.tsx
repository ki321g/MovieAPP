import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BaseMovieProps } from "../../types/interfaces";
import MovieList from "../movieList";

interface SimilarMoviesProps {
  movies: BaseMovieProps[];
  action: (movie: BaseMovieProps) => React.ReactNode;
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies, action }) => {
    
  return (
    <Box >
      <Grid container spacing={5} sx={{ padding: "10px" }}>
        <MovieList action={action} movies={movies} />
      </Grid>
    </Box>
  );
};

export default SimilarMovies;