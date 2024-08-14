import React, { useState } from "react";
import Chip from "@mui/material/Chip";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import Groups2Icon from '@mui/icons-material/Groups2';
import StarRateIcon from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { MovieDetailsProps, MovieTrailerVideoProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Modal from '@mui/material/Modal';
import HomeIcon from "@mui/icons-material/Home";`
`
// Styling for the movie details section
const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chip: {
    color: "#ffffff",
    backgroundColor: "transparent", // Transparent background for the chip items
    margin: "0.5rem",
    border: "2px solid #ffffff",
    fontSize: "1rem",
  },
  // Styling for the fab button for reviews
  fabContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  fab: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    width: "auto", 
    height: "auto", 
    padding: "0.5rem 1rem",
    margin: "0.5rem",
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontSize: '1.8em',
    fontWeight: '800',
  },
  taglineText: {
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
  overviewText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    color: "#ffffff",
    textAlign: 'start',
    letterSpacing: 'normal',
  },
  overviewHeaderText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    color: "#ffffff",
    textAlign: "start",
    letterSpacing: 'normal',
    fontSize: "2rem",
    fontWeight: 'bold',
  },
  userScoreText: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 'normal',
    fontSize: "1.5rem",
    fontWeight: 'bold',
  },
  movieTitle: {
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
  movieSubHeading: {
    fontFamily: '"Source Sans Pro", Arial, sans-serif',
    fontWeight: 'light',
    color: "#ffffff",
    textAlign: 'start',
    letterSpacing: 'normal',
    width:'100%', 
    fontSize: "20px", 
    lineHeight: '24px', 
  },
  trailerContainer: {
    width: "80%",
    maxWidth: "80%",
    aspectRatio: "16/9",
    marginBottom: "50px",
    border: "none",
  },
};

interface MovieDetailsComponentProps {
    movie: MovieDetailsProps;
    trailerVideo:MovieTrailerVideoProps;
  }

const MovieDetails: React.FC<MovieDetailsComponentProps> = ({movie, trailerVideo}) => {
    const [reviewDrawerOpen, setReviewDrawerOpen] = useState(false);
    const [open, setOpen] = React.useState(false);

  const releaseYear = new Date(movie.release_date).getFullYear(); // Year Released
  const votePercentage = movie.vote_average * 10; // Convert vote average to percentage

  // Function to convert runtime from minutes to hours and minutes
    const convertRuntime = (runtime: number) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
  console.log('trailer2: ', trailerVideo.key)

  return (
    <>
    <Typography variant="h4" component="h3" sx={styles.movieTitle}>
     {`${movie.title} (${releaseYear})`}
    </Typography>
    <Typography variant="body1" component="p" sx={styles.movieSubHeading}>
    {`${movie.release_date} ${'\u00A0\u00A0\u00A0'}•${'\u00A0\u00A0\u00A0'}`}
    {movie.genres.map((g, index) => (
        <React.Fragment key={g.name}>
        {index > 0 && ', '}
        {g.name}
        </React.Fragment>
        ))}
    {`${'\u00A0\u00A0\u00A0'}•${'\u00A0\u00A0\u00A0'}${convertRuntime(movie.runtime)}`}
    </Typography>
    <Typography variant="h5" component="h3" sx={styles.taglineText}>
        {movie.tagline}
    </Typography>   
    <Box display="flex" alignItems="center" sx={{ mt: 3, mb: 3 }}>
        <Box position="relative" display="inline-flex" width={60} height={60}>
            <CircularProgress 
                variant="determinate" 
                value={100} 
                size={60} 
                style={{ 
                    color: '#204529', 
                    position: 'absolute' 
                }} 
            />
            <CircularProgress 
                variant="determinate" 
                value={votePercentage} 
                size={60} style={{ 
                    color: '#21d07a', 
                    position: 'absolute' 
                }} 
            /> 
            <Box
                top="8%"
                left="8%"
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#081C22"
                borderRadius="50%"             
                width="82%"
                height="82%"           
            >
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }} color="textSecondary">
                    {`${Math.round(votePercentage)}%`}
                </Typography>
            </Box>
        </Box>
        <Typography variant="h5" component="h3" sx={styles.userScoreText}>
            {"\u00A0\u00A0\u00A0"}
            {"USER SCORE"}
            {"\u00A0\u00A0\u00A0"}
        </Typography>
        <Chip
        icon={<StarRateIcon />}
        label={`Count: ${movie.vote_count}`}
        sx={styles.chip}
        />  
        <Chip
        icon={<MonetizationIcon />}
        label={`$${movie.revenue.toLocaleString()}`}
        sx={styles.chip}
        />  
        <Chip 
            icon={<Groups2Icon />}
            label={`Popularity: ${movie.popularity}`}
            sx={styles.chip} 
        />
    </Box>      
    <Typography variant="h5" component="h3" sx={styles.overviewHeaderText}>            
            {"Overview"}
        </Typography> 
    <Typography variant="h6" component="p" sx={styles.overviewText}>
        {movie.overview}
    </Typography>
    <Box display="flex" alignItems="center" sx={styles.fabContainer}>         
        <Box sx={styles.fabContainer}>
            {/*  Reviews */}
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setReviewDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon fontSize="large" />
                Reviews
            </Fab>
            {/* Trailer */}
            <Fab
                color="secondary"
                variant="extended"
                onClick={handleOpen}
                sx={styles.fab}
            >
                <YouTubeIcon fontSize="large" />
                Watch Trailer
            </Fab>
            
            {/*  Movie Home */}
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => window.open(`${movie.homepage}`, '_blank')}
                sx={styles.fab}
            >
            <HomeIcon fontSize="large" />
                Open Link
            </Fab>
        </Box>
        
    </Box>
    {/* Trailer Modal */}
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
    <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '50%', 
        bgcolor: 'background.paper', 
        border: '2px solid #000', 
        boxShadow: 24, 
        p: 4, 
        aspectRatio: "16/9",
    }}>
        {trailerVideo && (
            
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                        title="Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: "none" }} //this seems to be the only way I can remove the iframe border
                    />
            
            )}
    </Box>
    </Modal>


    <Drawer anchor="top" open={reviewDrawerOpen} onClose={() => setReviewDrawerOpen(false)}>
        <MovieReviews {...movie} />
    </Drawer>
    </>
  );
};

export default MovieDetails;
