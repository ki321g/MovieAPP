import React, {useEffect, useContext} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { BaseMovieProps } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { Box } from '@mui/material';
import { AuthContext } from "../../contexts/authContext";

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

interface MovieListProps {
  movie:ListedMovie,
  action: (m: ListedMovie) => React.ReactNode;
}

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieCard: React.FC<MovieCardProps> = ({movie, action}) => {
  const authContext = useContext(AuthContext);
  const userLoggedIn = !!authContext?.token;

  const { favourites, addToFavourites, getFavourites } = useContext(MoviesContext);

  const isFavourite = favourites.find((id) => id === movie.id)? true : false;
  
  useEffect(() => {
    // Fetch the favourites here and update the state
    const fetchFavourites = async () => {
      await getFavourites(); 
    };
  
    fetchFavourites();
  }, []);

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
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                  {isFavourite ? (
                    <Avatar sx={styles.avatar}>
                      <FavoriteIcon />
                    </Avatar>
                  ) : null}
                </div>
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
              // padding: '20px',
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
                {userLoggedIn && (
                  <Box onClick={(e) => e.stopPropagation()}>
                    {action(movie)}
                  </Box>
                )}
                {/* <Link to={`/movies/${movie.id}`}>
                  <Button variant="outlined" size="medium" color="primary">
                    More Info ...
                  </Button>
                </Link> */}
              </CardActions>
              <CardContent sx={{ textAlign: 'left', padding: '20px', }}>
                {/* <Typography variant="h6" component="div" sx={{ margin: '10px 0' }}>
                  {movie.title}
                </Typography> */}
                <Typography variant="body2" color="white">
                {movie.overview.split(" ").reduce((prev, curr) => prev.length + curr.length <= 200 ? prev + " " + curr : prev)}
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