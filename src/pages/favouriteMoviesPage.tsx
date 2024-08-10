import React, { useState, useContext, useEffect } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
// import { auth } from '../config/firebase';
import { BaseMovieProps } from '../types/interfaces';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import SortMoviesUI from "../components/sortMoviesUi";

const styles = {
  root: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      flexWrap: "wrap",
      // marginBottom: 1.5,
      background: "#141414",
      boxShadow: 'none',
      paddingBottom: '20px',
  },
};

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {  
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("none");
  const { favourites: movieIds, getFavourites } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  useEffect(() => {
    // Fetch the favourites here and update the state
    getFavourites();
  }, []);

  // console.log("FavouriteMoviesPage: ", auth?.currentUser?.email);
  // console.log("FavouriteMoviesPage: ", auth?.currentUser?.displayName);
  // console.log("FavouriteMoviesPage: ", auth?.currentUser?.photoURL);
  // console.log("FavouriteMoviesPage: ", auth?.currentUser?.uid);
  // console.log("FavouriteMoviesPage: ", auth?.currentUser?.accessToken);


  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayedMovies = allFavourites
    ? filterFunction(allFavourites)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const prevPage = () => setPage((prev) => prev - 1);
	const nextPage = () => setPage((next) => next + 1);// Sort movies
  console.log(page);
  const sortedMovies = [...displayedMovies].sort((a, b) => {
    switch (sortOption) {
      case "none":
        return 0;
      case 'date':
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      case 'rating':
        return b.vote_average - a.vote_average;
      case 'popularity':
        return b.popularity - a.popularity;
      default:
        return 0;
    }
  });

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
  };

  return (
    <>
      <Paper component="div" sx={styles.root}>
  				<Grid container sx={{ paddingX: 60 }}>
					<Grid item>
						<IconButton onClick={prevPage} disabled
							aria-label="go back"
						>
							<KeyboardDoubleArrowLeftSharpIcon 
							color="secondary" 
							style={{ fontSize: 50, fontWeight: 'bold' }}
							/>
						</IconButton>
					</Grid>

					<Grid item xs>
						<Typography variant="h4" component="h3" align="center">
						Favourite Movies
						</Typography>
					</Grid>					

					<Grid item>
						<IconButton onClick={nextPage} disabled
							aria-label="go forward"
						>
							<KeyboardDoubleArrowRightSharpIcon 
							color="secondary"
							style={{ fontSize: 50, fontWeight: 'bold' }}
							/>
						</IconButton>
					</Grid>
				</Grid>
			</Paper>
      <PageTemplate        
        movies={sortedMovies}
        action={(movie: BaseMovieProps) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <SortMoviesUI onSortChange={changeSortOption} />
    </>
  );
};

export default FavouriteMoviesPage;