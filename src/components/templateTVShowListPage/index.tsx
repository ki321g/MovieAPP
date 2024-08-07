import React from "react";TVShowList
import Header from "../headerTVShowList";
import Grid from "@mui/material/Grid";
import TVShowList from "../tvShowList";
import { TVShowListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    // backgroundColor: "#bfbfbf",
    backgroundColor: "#141414",
  }
};

const TVShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = ({ tvShows, title, action })=> {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <TVShowList action={action} tvShows={tvShows}></TVShowList>
      </Grid>
    </Grid>
  );
}
export default TVShowListPageTemplate;