import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {BaseMovieProps} from "../../types/interfaces"
import { Link } from "react-router-dom";

const WriteReviewIcon:React.FC<BaseMovieProps> = (movie) => {
  return (
    <Link
    to={'/reviews/form'}
    state={{
        movieId: movie.id,
      }}
  >
    <RateReviewIcon 
        color="secondary" 
        style={{ fontSize: 40, fontWeight: 'bold' }}
      />
  </Link>
  );
};

export default  WriteReviewIcon;