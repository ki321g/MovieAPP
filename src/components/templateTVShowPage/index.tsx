import React, { useState } from "react"; 
//  import TVShowHeader from "../headerTVShow";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTVShowImages, getSimilarTVShows } from "../../api/tmdb-api";
import { TvImage, TvShowDetailsProps, BaseTvShowProps, DiscoverTvShows } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Box from "@mui/material/Box";
import SimilarTVShows from "../similarTVShows";
import AddToTVShowFavouritesIcon from "../cardIcons/addToTVShowFavourites";
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

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
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        marginTop: "100px",
        marginLeft: "auto",
        width: 425,
        height: '100vh',
    },
    contentBox: {
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
    similarMovies: {        
        Width: "100%;"
    },
    similarMoviesText: {        
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

interface TVShowPageTemplateProps {
    tvShow: TvShowDetailsProps;
    children: React.ReactElement;
}

const TVShowPageTemplate: React.FC<TVShowPageTemplateProps> = ({tvShow, children}) => {
    const [page, setPage] = useState(1);

    // Get Images with useQuery
    const { data: imageData, error: imageError, isLoading: imageLoading, isError: isImageError } = useQuery<
        { posters: TvImage[]; backdrops: TvImage[] }, Error> (
            ["images", tvShow.id], 
            () => getTVShowImages(tvShow.id)
        );
    
    // Get Similar Movies with useQuery
    const { data: similarTVShowsData, error: similarTVShowsError, isLoading: similarTVShowsLoading, isError: isSimilarTVShowsError, isPreviousData } = useQuery<DiscoverTvShows, Error>({
            queryKey: ["similarMovies", page],
            queryFn: () => getSimilarTVShows(tvShow.id, page),
            keepPreviousData: true
        });

    if (imageLoading || similarTVShowsLoading) {
        return <Spinner />;
    }

    if (isImageError) {
        return <h1>{imageError.message}</h1>;
    }

    if (isSimilarTVShowsError) {
        return <h1>{similarTVShowsError.message}</h1>;
    }

    const similarTVShows = similarTVShowsData?.results || [];

    // Destructure the imageData into backdrops & posters
    const { backdrops, posters } = imageData as { 
        posters: TvImage[]; 
        backdrops: TvImage[] 
    };

    const backdropUrl =
      backdrops.length > 0
        ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://image.tmdb.org/t/p/original/${backdrops[0].file_path})`
        : `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(https://via.placeholder.com/1920x1080?text=Backdrop+Not+Available)`;

        // Style for the content container
    const contentBoxStyle = {
        ...styles.contentBox,
         backgroundImage: backdropUrl,  
    };

	const prevPage = () => setPage((prev) => prev - 1);
	const nextPage = () => setPage((next) => next + 1);

    return (
        <>
            <Box sx={contentBoxStyle}>
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
                                    alt={tvShow.name}
                                />
                            </ImageListItem>
                        </ImageList>
                    </div>
                </Grid>
                <Grid item xs={8.5}>
                    {children}
                </Grid>
            </Grid>
        </Box>

        <Box sx={styles.similarMovies}>
                <Paper component="div" sx={styles.root}>
                    <Grid container sx={{ paddingX: 60 }}>
                        <Grid item>
                            <IconButton onClick={prevPage} disabled={isPreviousData || page === 1}
                                aria-label="go back"
                            >
                                <KeyboardDoubleArrowLeftSharpIcon 
                                color={isPreviousData || page === 1 ? "disabled" : "secondary"} 
                                style={{ fontSize: 50, fontWeight: 'bold' }}
                                />
                            </IconButton>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h4" component="div" sx={styles.similarMoviesText} >
                            SIMILAR TV SHOWS
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography align="right" sx={{ pt: 2, pr: 2 }}>
                                {page} of {similarTVShowsData?.total_pages}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <IconButton onClick={nextPage} disabled={isPreviousData || page === similarTVShowsData?.total_pages}
                                aria-label="go forward"
                            >
                                <KeyboardDoubleArrowRightSharpIcon 
                                color={isPreviousData || page === similarTVShowsData?.total_pages ? "disabled" : "secondary"}  
                                style={{ fontSize: 50, fontWeight: 'bold' }}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>

            {similarTVShows.length > 0 && (
            <SimilarTVShows
                tvShows={similarTVShows}
                action={(tvShow: BaseTvShowProps) => <AddToTVShowFavouritesIcon {...tvShow} />}
            />
                )}
            </Box>






        </>
    );
};

export default TVShowPageTemplate;