// import React, { useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getActor } from "../api/tmdb-api";
import ActorDetails from "../components/actorDetails";
// import { ActorDetailsProps, BaseMovieProps, BaseTvShowProps } from "../types/interfaces";
import { ActorDetailsProps } from "../types/interfaces";
import Spinner from "../components/spinner";
// import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";


const styles = {    
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
        marginTop: "100px",
        marginLeft: "auto",
        width: 425,
        height: '100vh',
      },
};


const ActorDetailsPage: React.FC = () => {   
    const { id } = useParams();

    const { data: actor, error: errorData, isLoading: isLoadingData, isError: isErrorData } = useQuery<ActorDetailsProps, Error>(["actor", id], () => getActor(id || ""));

    // Handle Loading State
    if (isLoadingData) {
        return <Spinner />;
    };

    // Handle Error State
    if (isErrorData) {
        return <h1>{errorData.message}</h1>;
    };
    
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



          
        
            {/* <h1>Actor Details Page</h1>
            <Typography variant="h5" component="div">
            {actor && actor.name}
            </Typography> */}
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
    );
};

export default ActorDetailsPage;
