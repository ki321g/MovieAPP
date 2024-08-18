import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BaseTvShowProps } from "../../types/interfaces";
import TvShowList from "../tvShowList";

interface SimilarTVShowsProps {
    tvShows: BaseTvShowProps[];
    action: (tvShow: BaseTvShowProps) => React.ReactNode;
}

const SimilarTVShows: React.FC<SimilarTVShowsProps> = ({ tvShows, action }) => {
    
  return (
    <Box >
      <Grid container spacing={5} sx={{ padding: "10px" }}>
        <TvShowList action={action} tvShows={tvShows} />
      </Grid>
    </Box>
  );
};

export default SimilarTVShows;