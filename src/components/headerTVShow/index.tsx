import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { TVShowPageProps } from "../../types/interfaces"; 
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";

const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const TVShowHeader: React.FC<TVShowPageProps> = (tvShow) => {
  // Get movies from local storage.
  // const favourites = JSON.parse(localStorage.getItem("favourites") || '[]');
  // const isFavourite = favourites.find((favourite) => favourite.id === movie.id);
  // const isFavourite: any = favourites.find((favourite: { id: number }) => favourite.id === tvShow.id);
  const isFavourite: any = false;
  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="secondary" fontSize="large" />
      </IconButton>
      {
         isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
      <Typography variant="h4" component="h3">
        {tvShow.name}{"   "}
        <br />
        <span>{`${tvShow.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="secondary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TVShowHeader;