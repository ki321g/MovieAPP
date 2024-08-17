// import React, {useEffect, useContext} from "react";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import img from '../../images/film-poster-placeholder.png';
import { FantasyMovieProps } from "../../types/interfaces"; 
import { Box } from '@mui/material';

const styles = {
  card: { maxWidth: 345,
          height: '100%',
          background: "#303030",
          boxShadow: 'none',
        },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface MovieCardProps {
  movie: FantasyMovieProps;
}

/* MovieCard component for Fantasy movies
 * This component is used to display a movie card for fantasy movies
 */
const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
  return (
    <>
    <Box
      sx={{
        perspective: '1000px', // Creates a 3D space
        width: '300px',
        height: '450px',
        '&:hover .innerCard': {
          transform: 'rotateY(180deg)',
        },
      }}
    >
      {movie && (
        <Box
          className="innerCard"
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.8s',
          }}
        >
          {/* Front Side (Poster) */}
          <Box 
            className="frontInnerCard"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              overflow: 'hidden',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transform: 'rotateY(0deg)',
            }}
          >
            <Box 
              className="frontContentInnerCard"
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <Card sx={styles.card}>
                <CardMedia
                  component="img"
                  image={
                    movie.poster_path
                      ? movie.poster_path
                      : img
                  }
                  alt={movie.title}
                  sx={{
                    height: '100%',
                    width: '100%',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </Card>
            </Box>

        </Box>
          {/* Back Side (Different Image and Details) */}
          <Box
            className="backInnerCard"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundColor: '#303030',
              color: 'white',
              transform: 'rotateY(180deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              boxSizing: 'border-box',
              border: 'none',
              backgroundImage: 'none',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Card sx={styles.card}>
              <CardHeader
                title={
                  <Typography variant="h6" component="p">
                    {movie.title}{" "}
                  </Typography>
                }
              />
              <CardActions disableSpacing>
              </CardActions>
              <CardContent sx={{ textAlign: 'left', padding: '20px', }}>               
                <Typography variant="body2" color="white">
                {movie.overview ? movie.overview.split(" ").reduce((prev, curr) => prev.length + curr.length <= 200 ? prev + " " + curr : prev) : 'No overview available'}
                </Typography>
                Genre: {movie.genre}
                <br />
                Release Date: {movie.release_date}
                <br />
                runTime: {movie.runtime}
                <br />
                productionCompany: {movie.productionCompany} 
                <br />
                receivedAnOscar: {movie.receivedAnOscar ? 'True' : 'False'}
                <br />
                MovieID: {movie.id}
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
    </>
  );
}

export default MovieCard;