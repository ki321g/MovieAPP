import React from "react"; 
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages, getMovieVideos } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Box from "@mui/material/Box";

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "10px",
      position: "relative",
      zIndex: 2,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "100%",
    },
};

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    children: React.ReactElement;
}


const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({movie, children}) => {
    // Get Images with useQuery
    const { data: imageData, error: imageError, isLoading: imageLoading, isError: isImageError } = useQuery<
        { posters: MovieImage[]; backdrops: MovieImage[] }, Error> (
            ["images", movie.id], 
            () => getMovieImages(movie.id)
        );
        
    // Get Images with useQuery
    const { data: videoData, error: videoError, isLoading: videoLoading, isError: isVideoError } = useQuery<{ videos: { key: string; site: string; type: string }[] },
    Error
     >(["videos", movie.id], () => getMovieVideos(movie.id));

    // Display a spinner when data is loading
    if (imageLoading || videoLoading ) {
        return <Spinner />;
    }

    if (isImageError) {
        return <h1>{imageError.message}</h1>;
    }

    if (isVideoError) {
        return <h1>{videoError.message}</h1>;
    }

    // Find the trailer video
    const trailerVideo = videoData?.videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

    // Destructure the imageData into backdrops & posters
    const { backdrops, posters } = imageData as { 
        posters: MovieImage[]; 
        backdrops: MovieImage[] 
    };

    const backdropUrl =
      backdrops.length > 0
        ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original/${backdrops[0].file_path})`
        : `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://via.placeholder.com/1920x1080?text=Backdrop+Not+Available)`;
    

    // Style for the content container
    const contentContainerStyle = {
        ...styles.contentContainer,
         backgroundImage: backdropUrl,  
    };

    return (
        <>
            {/* <MovieHeader {...movie} /> */}
            <Box sx={contentContainerStyle}>
            <Grid container spacing={5} style={{ padding: "10px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1} style={{ overflow: 'hidden' }}>
                                <ImageListItem
                                    key={posters[0].file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${posters[0].file_path}`}
                                        alt={movie.title}
                                    />
                                </ImageListItem>
                        </ImageList>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    {children}
                </Grid>
            </Grid>
            </Box>
        </>
    );
};

export default TemplateMoviePage;