import React from "react";
import { Review } from "../../types/interfaces";
import { Typography } from "@mui/material";

const styles = {
  reviewedByText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontSize: '2.8rem',
    color: "#ffffff",
    textAlign: 'start',
    letterSpacing: 'normal',
    width:'100%',
    margin: '0',
    padding: '0',
    fontWeight: 'bold',
    marginTop: '25px',
  },
  reviewText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    color: "#ffffff",
    textAlign: 'start',
    letterSpacing: 'normal',
    marginTop: '10px',
    marginBottom: '0',
    fontSize: '1.8em',
    fontWeight: '400',
    fontStyle: 'italic',
    opacity: '.7',
  },
};

const MovieReview: React.FC<Review> =  (props) => {
  return (
    <>
    <Typography sx={styles.reviewedByText}>Review By: {props.author} </Typography>
    <Typography sx={styles.reviewText}>{props.content} </Typography>
    </>
  );
};
export default MovieReview