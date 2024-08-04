import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../../types/interfaces";
import { Box } from "@mui/material"

const MovieList: React.FC<BaseMovieListProps> = ({movies, action}) => {
  let movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} movie={m} action={action}/>
    </Grid>
  ));
  // return movieCards;
  return (
    <Box pt={9} pb={2} pl={6} pr={2}>
      <Grid container spacing={2}>
        {movieCards}
      </Grid>
    </Box>
  );
}

  export default MovieList;