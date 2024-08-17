import React, { useState } from "react";
import { TvShowDetailsProps, TvShowTrailerVideoProps } from "../../types/interfaces";
import TVShowReviews from '../tvShowReviews';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Groups2Icon from '@mui/icons-material/Groups2';
import StarRateIcon from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Chip from "@mui/material/Chip";
import NavigationIcon from "@mui/icons-material/Navigation";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Modal from '@mui/material/Modal';
import HomeIcon from "@mui/icons-material/Home";
import Cast from "../cast";

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
      marginTop: "0.5rem",
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
      fontSize: '1.4em',
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
interface TvShowDetailsComponentProps {
    tvShow: TvShowDetailsProps;
    trailerVideo:TvShowTrailerVideoProps;
  }

const TVShowDetails: React.FC<TvShowDetailsComponentProps> = ({tvShow, trailerVideo}) => {
    const [reviewDrawerOpen, setReviewDrawerOpen] = useState(false);
    const [open, setOpen] = React.useState(false);

    const releaseYear = new Date(tvShow.first_air_date).getFullYear(); // Year Released
    const votePercentage = tvShow.vote_average * 10; // Convert vote average to percentage

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <Typography variant="h4" component="h3" sx={styles.movieTitle}>
         {`${tvShow.name} (${releaseYear})`}
        </Typography>
    <Typography variant="body1" component="p" sx={styles.movieSubHeading}>
    {`${tvShow.first_air_date} ${'\u00A0\u00A0\u00A0'}•${'\u00A0\u00A0\u00A0'}`}
    {tvShow.genres.map((g, index) => (
        <React.Fragment key={g.name}>
        {index > 0 && ', '}
        {g.name}
        </React.Fragment>
        ))}
    </Typography>
    <Typography variant="h5" component="h3" sx={styles.taglineText}>
        {tvShow.tagline}
    </Typography>   
    <Box display="flex" alignItems="center" sx={{ mt: 2, mb: 2 }}>
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
        label={`Count: ${tvShow.vote_count}`}
        sx={styles.chip}
        />  
        <Chip
        icon={<AutorenewIcon />}
        label={`Status: ${tvShow.status}`}
        sx={styles.chip}
        />  
        <Chip 
            icon={<Groups2Icon />}
            label={`Popularity: ${tvShow.popularity}`}
            sx={styles.chip} 
        />
    </Box>
    <Typography variant="h5" component="h3" sx={styles.overviewHeaderText}>            
            {"Overview"}
    </Typography> 
    <Typography variant="h6" component="p" sx={styles.overviewText}>
        {tvShow.overview}
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
                onClick={() => window.open(`${tvShow.homepage}`, '_blank')}
                sx={styles.fab}
            >
            <HomeIcon fontSize="large" />
                TV Show Home
            </Fab>
        </Box>
        
    </Box>
    
    {/* Review Drawer  */}
    <Drawer anchor="top" open={reviewDrawerOpen} onClose={() => setReviewDrawerOpen(false)}>
        <TVShowReviews {...tvShow} />
    </Drawer>
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
                        style={{ border: "none" }} 
                    />
            
            )}
    </Box>
    </Modal>
    <Cast tvShowId={tvShow.id} />















            {/* <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShow.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip
                    icon={<ListIcon />}
                    label={`${tvShow.number_of_episodes} episodes`}
                    sx={styles.chip}
                    />
                <Chip
                    icon={<LayersIcon />}
                    label={`${tvShow.number_of_seasons} seasons`}
                    sx={styles.chip}
                />
                <Chip label={`First Air Date: ${tvShow.first_air_date}`} sx={styles.chip} />
                <Chip label={`Popularity: ${tvShow.popularity}`} sx={styles.chip} />
            </Paper>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <TVShowReviews {...tvShow} />
            </Drawer> */}
        </>
    );
};
export default TVShowDetails;