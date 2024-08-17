import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BaseTvShowListProps } from "../../types/interfaces";
import TvShowList from "../tvShowList";

const ActorCredits: React.FC<BaseTvShowListProps> = ({ tvShows, action }) => {
  return (
    <Box >
      <Grid container spacing={5} sx={{ padding: "10px" }}>
        <TvShowList tvShows={tvShows} action={action} />
      </Grid>
    </Box>
  );
};

export default ActorCredits;