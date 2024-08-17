import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../../types/interfaces";
import MovieList from "../movieList";

const ActorCredits: React.FC<BaseMovieListProps> = ({ movies, action }) => {
  return (
    <Box >
      <Grid container spacing={5} sx={{ padding: "10px" }}>
        <MovieList movies={movies} action={action} />
      </Grid>
    </Box>
  );
};

export default ActorCredits;