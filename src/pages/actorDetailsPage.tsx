import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActor, getActorMovieCredits, getActorTVShowCredits } from "../api/tmdb-api";
import ActorDetails from "../components/actorDetails";
import { ActorDetailsProps, BaseMovieProps, BaseTvShowProps } from "../types/interfaces";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToTvFavouritesIcon from "../components/cardIcons/addToTVShowFavourites";
import ActorTvCredits from "../components/actorTvCredits";
import ActorCredits from "../components/actorCredits";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        background: "#141414",
        boxShadow: 'none',
        // paddingBottom: '20px',
        paddingTop: '40px',
    },
    contentBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10px",
        position: "relative",
        zIndex: 2,
        backgroundColor: '#282828',
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
      },
      imageListItem: {
        marginTop: "25px",
        marginLeft: "auto",
        width: 425,
        height: '100vh',
      },
      creditsHeaderText: {
        fontFamily: '"Source Sans Pro", Arial, sans-serif',
        fontSize: '3.25rem',
        color: "#ffffff",
        textAlign: 'center',
        letterSpacing: 'normal',
        width:'100%',
        margin: '0',
        padding: '0.5rem',
        fontWeight: '900',
        marginTop: '25px',
        marginBottom: '15px',
        whiteSpace: 'nowrap',
      },
      movieTVShowText: {        
          fontFamily: '"Source Sans Pro", Arial, sans-serif',
          fontSize: '2.8rem',
          color: "#ffffff",
          textAlign: 'center',
          letterSpacing: 'normal',
          width:'100%',
          margin: '0',
          padding: '0',
          fontWeight: 'bold',
      },
};


const ActorDetailsPage: React.FC = () => {   
    const { id } = useParams();
    const [creditType, setCreditType] = useState<"movie" | "tv">("movie");

    // Fetch The Actor Details
    const { data: actor, error: errorData, isLoading: isLoadingData, isError: isErrorData } = useQuery<ActorDetailsProps, Error>(["actor", id], () => getActor(id || ""));

    // Fetch The Actor Movie Credits
    const { data: movieCredits, error: errorMovieCredits, isLoading: isLoadingMovieCredits, isError: isErrorMovieCredits } = useQuery< { cast: BaseMovieProps[] }, Error>(["actorMovieCredits", id], () => getActorMovieCredits(id || ""));

    // Fetch The Actor TV Show Credits
    const { data: tvShowCredits, error: errorTVShowCredits, isLoading: isLoadingTVShowCredits, isError: isErrorTVShowCredits } = useQuery<{ cast: BaseTvShowProps[] }, Error>(["actorTVShowCredits", id], () => getActorTVShowCredits(id || ""));

    // Handle Loading State
    if (isLoadingData || isLoadingMovieCredits || isLoadingTVShowCredits) {
        return <Spinner />;
    };

    // Handle Error State
    if (isErrorData ) {
        return <h1>{errorData.message}</h1>;
    };

    if (isErrorMovieCredits ) {
        return <h1>{errorMovieCredits.message}</h1>;
    };

    if (isErrorTVShowCredits ) {
        return <h1>{errorTVShowCredits.message}</h1>;
    };

    const handleToggle = (_event: React.MouseEvent<HTMLElement>, newCreditType: "movie" | "tv" | null) => {
        if (newCreditType === null) return;
        setCreditType(newCreditType);
    };

    const currentCredits = creditType === "movie" ? movieCredits?.cast || [] : tvShowCredits?.cast || [];

    return (
        
    <>
    {actor ? (
        <>
        <Box sx={styles.contentBox}>
            <Grid container spacing={5} style={{ padding: "10px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1} style={{ overflow: 'hidden' }}>
                                <ImageListItem
                                    key={actor?.profile_path}
                                    sx={styles.imageListItem}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                        alt={actor?.name}
                                    />
                                </ImageListItem>
                        </ImageList>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <ActorDetails actor={actor} />
                </Grid>                    
            </Grid>            
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <ToggleButtonGroup
                exclusive
                value={creditType}
                onChange={handleToggle}
            >
                <ToggleButton sx={styles.creditsHeaderText} value="movie">Movie Credits</ToggleButton>
                <ToggleButton sx={styles.creditsHeaderText} value="tv">TV Credits</ToggleButton>
            </ToggleButtonGroup>
        </Box>
          {creditType === 'movie' ? (
            <>
            <ActorCredits
              movies={currentCredits as BaseMovieProps[]}
              action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
            />
            </>
          ) : (
            <>
            <ActorTvCredits
              tvShows={currentCredits as BaseTvShowProps[]}
              action={(tvShow: BaseTvShowProps) => <AddToTvFavouritesIcon {...tvShow} />}
            />
            </>
          )}
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
    );
};

export default ActorDetailsPage;
