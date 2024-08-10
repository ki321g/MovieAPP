import React from "react";
import TVShow from "../tvShowCard/";
import Grid from "@mui/material/Grid";
import { BaseTvShowListProps, BaseTvShowProps} from "../../types/interfaces";
import { Box } from "@mui/material"

const TVShowList: React.FC<BaseTvShowListProps> = ({tvShows, action}) => {
  
  let tvShowCards = tvShows.map((tvShow: BaseTvShowProps) => (
    <Grid container key={tvShow.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TVShow key={tvShow.id} tvShow={tvShow} action={action}/>
    </Grid>
  ));
    console.log(location.pathname);
  if (location.pathname === '/tv/favourites') {
    return tvShowCards;
  } else {
     return (
    <Box pt={5} pb={2} pl={6} pr={2}>
      <Grid container spacing={2}>
        {tvShowCards}
      </Grid>
    </Box>
  );
  } 
}

  export default TVShowList;