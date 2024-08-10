import React from "react";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    // backgroundColor: "#bfbfbf",
    backgroundColor: "#141414",
  }
};

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies,  action })=> {
  return (
      
      <Grid container sx={styles.root}>
      <Grid item container spacing={5}>
        <MovieList action={action} movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;