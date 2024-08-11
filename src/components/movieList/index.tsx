import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../../types/interfaces";
import { Box } from "@mui/material"


const MovieList: React.FC<BaseMovieListProps> = ({movies, action}) => {
  
  let movieCards = movies.map((m) => (
    <Grid container key={m.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Movie key={m.id} movie={m} action={action}/>
    </Grid>
  ));
    console.log(location.pathname);
  if (location.pathname === '/movies/favourites') {
    return movieCards;
  } else {
     return (
    <Box pt={5} pb={2} pl={6} pr={2}>
      <Grid container spacing={2}>
        {movieCards}
      </Grid>
    </Box>
  );
  }


   
 
}

  export default MovieList;