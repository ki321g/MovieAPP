import React, { useContext} from "react";
import { TVShowContext } from "../../contexts/tvShowContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTvShowProps } from "../../types/interfaces"

const AddToTVShowFavouritesIcon: React.FC<BaseTvShowProps> = (tvShow) => {
  // const { favourites, addToFavourites } = useContext(TVShowContext);
  const { addToFavourites } = useContext(TVShowContext);
  // console.log(favourites);

  const onUserSelect = () => {
    addToFavourites(tvShow);
  };
 
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon  
        color="secondary" 
        style={{ fontSize: 40, fontWeight: 'bold' }}
      />
    </IconButton>
  );
};

export default AddToTVShowFavouritesIcon;