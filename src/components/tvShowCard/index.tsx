import React, {useEffect, useContext} from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

import img from '../../images/film-poster-placeholder.png';
import { BaseTvShowProps } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { TVShowContext } from "../../contexts/tvShowContext";
import { Box } from '@mui/material';
import { AuthContext } from "../../contexts/authContext";

const styles = {
  card: { maxWidth: '450',
          height: '100%',
          background: "#303030",
          boxShadow: 'none',
        },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

// interface TvShowListProps {
//   tvShow:ListedTVShow,
//   action: (m: ListedTVShow) => React.ReactNode;
// }

interface TVShowCardProps {
  tvShow: BaseTvShowProps;
  action: (m: BaseTvShowProps) => React.ReactNode;
}

const TVShowCard: React.FC<TVShowCardProps> = ({tvShow, action}) => {
  const authContext = useContext(AuthContext);
  const userLoggedIn = !!authContext?.token;

  const { favourites, getFavourites } = useContext(TVShowContext);

  const isFavourite = favourites.find((id) => id === tvShow.id)? true : false;
  
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
        width: '450px',
        height: '650px',
        '&:hover .innerCard': {
          transform: 'rotateY(180deg)',
        },
      }}
    >
      {tvShow && (
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
                    tvShow.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
                      : img
                  }
                  alt={tvShow.name}
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
              backgroundColor: '#333',
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
                    {tvShow.name}{" "}
                  </Typography>
                }
              />
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`}
                alt={tvShow.name}
                sx={{
                  // height: '100%',
                  alignSelf: 'flex-start',
                  width: '100%',
                  borderRadius: '0px 0px 0 0',
                }}
              />              
              <CardActions disableSpacing>
                {userLoggedIn && (
                  <Box onClick={(e) => e.stopPropagation()}>
                    {action(tvShow)}
                  </Box>
                )}
                <Link to={`/tv/${tvShow.id}`}>
                  <Button  
                    variant="outlined"
                    color="secondary" 
                    style={{ fontSize: 16, fontWeight: 'bold' }}
                  >
                    More Info ...
                  </Button>
                </Link>
              </CardActions>
              <CardContent sx={{ textAlign: 'left', padding: '20px', }}>
                <Typography variant="body2" color="white">
                {/* {tvShow.overview.split(" ").reduce((prev, curr) => prev.length + curr.length <= 200 ? prev + " " + curr : prev)} */}
                {tvShow.overview}
                {/* {
                  tvShow.overview.split(" ").reduce((prev, curr) => 
                    prev.length + curr.length <= 180 
                      ? prev + " " + curr 
                      : prev.length <= 180 && prev.length + "...".length > 180
                        ? prev + "..."
                        : prev
                  )
                } */}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Box>
    </>
  );
}

export default TVShowCard;