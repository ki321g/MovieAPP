import React from "react";TVShowList

import Grid from "@mui/material/Grid";
import TVShowList from "../tvShowList";
import { TVShowListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#141414",
  }
};


const TVShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = ({ tvShows, action })=> {
  
  return (
    
    <Grid container sx={styles.root}>
      <Grid item container spacing={5}>
        <TVShowList action={action} tvShows={tvShows}></TVShowList>
      </Grid>
    </Grid>
  );
}
export default TVShowListPageTemplate;