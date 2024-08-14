import React, { useState }  from 'react';
// import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages, getSimilarMovies } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps, DiscoverMovies } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Box from "@mui/material/Box";
import SimilarMovies from "../similarMovies";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
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

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    children: React.ReactElement;
}


const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({movie, children}) => {
    const [page, setPage] = useState(1);

    // Get Images with useQuery
    const { data: imageData, error: imageError, isLoading: imageLoading, isError: isImageError } = useQuery<
        { posters: MovieImage[]; backdrops: MovieImage[] }, Error> (
            ["images", movie.id], 
            () => getMovieImages(movie.id)
        );
        
    const { data: similarMoviesData, error: similarMoviesError, isLoading: similarMoviesLoading, isError: isSimilarMoviesError, isPreviousData } = useQuery<DiscoverMovies, Error>({
        queryKey: ["similarMovies", page],
        queryFn: () => getSimilarMovies(movie.id, page),
        keepPreviousData: true
    });

    // Display a spinner when data is loading
    if (imageLoading || similarMoviesLoading ) {
        return <Spinner />;
    }

    if (isImageError) {
        return <h1>{imageError.message}</h1>;
    }
    if (isSimilarMoviesError) {
        return <h1>{similarMoviesError.message}</h1>;
    }
    console.log("similarMoviesData");
    console.log(similarMoviesData);
    const similarMovies = similarMoviesData?.results || [];

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

	const prevPage = () => setPage((prev) => prev - 1);
	const nextPage = () => setPage((next) => next + 1);

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
						SIMILAR MOVIES
						</Typography>
					</Grid>

					<Grid item>
						<Typography align="right" sx={{ pt: 2, pr: 2 }}>
							{page} of {similarMoviesData?.total_pages}
						</Typography>
					</Grid>

					<Grid item>
						<IconButton onClick={nextPage} disabled={isPreviousData || page === similarMoviesData?.total_pages}
							aria-label="go forward"
						>
							<KeyboardDoubleArrowRightSharpIcon 
							color={isPreviousData || page === similarMoviesData?.total_pages ? "disabled" : "secondary"}  
							style={{ fontSize: 50, fontWeight: 'bold' }}
							/>
						</IconButton>
					</Grid>
				</Grid>
			</Paper>

            {similarMovies.length > 0 && (
            <SimilarMovies
                movies={similarMovies}
                action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
            />
                )}
            </Box>
        </>
    );
};

export default TemplateMoviePage;