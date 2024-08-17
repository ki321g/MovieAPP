import React, { useState, useEffect } from 'react';
import { useQueries } from 'react-query';
import PageTemplate from '../components/templateMovieListPage';
import PageTemplateTVShow from '../components/templateTVShowListPage';
import { getGenres, getTVShowGenres, getSearchResults } from '../api/tmdb-api';
import { useTheme } from '@mui/material/styles';
import { Button, Box, Grid, TextField, MenuItem, Typography } from '@mui/material'; 
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import AddToTVShowFavouritesIcon from '../components/cardIcons/addToTVShowFavourites';
import { BaseMovieProps, BaseTvShowProps } from '../types/interfaces';
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Spinner from '../components/spinner';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import Snackbar from '@mui/material/Snackbar';
// import Slide, { SlideProps } from '@mui/material/Slide';

/* 
 * I had handleAlert and handleAlertClose functions to handle the alert messages
 * but there was an issue with the alert message not displaying properly after the first alert message was displayed.
 * I have commented out the alert message code and will revisit it later.
 */

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        background: "#141414",
        boxShadow: 'none',
    },
	customBoxLeft: {
		height: '100vh',
		backgroundColor: '#282828',
		color: '#fff',
		padding: '0px',
	},
	title: {
	  flexGrow: 1,
	  fontWeight: 'bold',      
	  fontFamily: '"Source Sans Pro", Arial, sans-serif',
	  fontSize: '3rem',
	  background: 'linear-gradient(180deg, #35B8D8, #06203E)',
	  WebkitBackgroundClip: 'text',
	  WebkitTextFillColor: 'transparent',
	  letterSpacing: 'normal',
	  margin: '0',
	  padding: '0',
	},
	titleText: {
		fontFamily: '"Source Sans Pro", Arial, sans-serif',
		fontWeight: '900', 
		fontSize: '3.2rem',
		background: 'linear-gradient(180deg, #35B8D8, #06203E)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		color: "#ffffff",
		textAlign: 'center',
		letterSpacing: 'normal',
		width:'100%',
		margin: '0',
		padding: '0',
	},
	pageNumberText: {
		fontFamily: '"Source Sans Pro", Arial, sans-serif',
		fontSize: '2rem',
		background: 'linear-gradient(180deg, #35B8D8, #06203E)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		color: "#ffffff",
		textAlign: 'center',
		letterSpacing: 'normal',
		width:'100%',
		margin: '0',
		padding: '0',
		fontWeight: 'bold',
	},
	labelText: {
		fontWeight: '800',      
	  	fontFamily: '"Source Sans Pro", Arial, sans-serif',
		background: '#ffffff',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	  },
	  button: {
		fontWeight: '900',      
		fontFamily: '"Source Sans Pro", Arial, sans-serif',
		fontSize: '2rem',
		padding: '20px',
		background: 'linear-gradient(180deg, #35B8D8, #06203E)',
		'&:hover': {
			background: 'linear-gradient(90deg, #35B8D8, #06203E)',
		}, 
	  },
	  errorText: {
		flexGrow: 1,
		fontWeight: 'bold',      
		fontFamily: '"Source Sans Pro", Arial, sans-serif',
		fontSize: '1.2rem',
		
		background: 'linear-gradient(180deg, #ff0000, #800000)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		letterSpacing: 'normal',
		align: 'center',
		margin: '0',
		padding: '0',
	  },
};

/*
	HomePage component is a functional component that displays the Movies/TVShows search form and the search results.
	
	The component uses the 
	1. useQueries hook to fetch Movies/TVShows.
	2. useState hook to manage the form state.
	3. useEffect hook to disable the main scrollbar when the component mounts and enable it when the component unmounts.
*/
const HomePage: React.FC = () => {
	const theme = useTheme();
	const [page, setPage] = useState(1);
	const [pageTV, setPageTV] = useState(1);
	const [formError, setFormError] = useState<string | null>(null);
  	// form state to manage the search form
	const [form, setForm] = useState({
		media: 'movie',
		with_keywords: '',
		genre: '',
		release_date_from: '1888',
		release_date_to: '2024',
		vote_average: '',
		watch_region: '',
		sort_by: '',
	});
	// Sort By Options for Movies and TV Shows
	const tvSort = [
		['Popularity Ascending', 'popularity.asc'],
		['Popularity Descending', 'popularity.desc'],
		['First Air Date Ascending', 'first_air_date.asc'],
		['First Air Date Descending', 'first_air_date.desc'],
		['Vote Average Ascending', 'vote_average.asc'],
		['Vote Average Descending', 'vote_average.desc'],
	  ];

	  const movieSort = [
		['Popularity Ascending', 'popularity.asc'],
		['Popularity Descending', 'popularity.desc'],
		['Release Date Ascending', 'release_date.asc'],
		['Release Date Descending', 'release_date.desc'],
		['Revenue Ascending', 'revenue.asc'],
		['Revenue Descending', 'revenue.desc'],
		['Primary Release Date Ascending', 'primary_release_date.asc'],
		['Primary Release Date Descending', 'primary_release_date.desc'],
		['Original Title Ascending', 'original_title.asc'],
		['Original Title Descending', 'original_title.desc'],
		['Vote Average Ascending', 'vote_average.asc'],
		['Vote Average Descending', 'vote_average.desc'],
		['Vote Count Ascending', 'vote_count.asc'],
		['Vote Count Descending', 'vote_count.desc'],
	  ];

	useEffect(() => {
		// Disable the main scrollbar when the component mounts
		document.body.style.overflow = 'hidden';

		// Enable the main scrollbar when the component unmounts
		return () => {
		  document.body.style.overflow = 'auto';
		};
	  }, []);

	/* 
	 * Combine useQueries to call getGenres or getTVShowGenres to Fetch genres based on media type 
	 * 	https://tanstack.com/query/latest/docs/framework/react/reference/useQueries
	 */
	const [{ data: movieGenres }, { data: tvShowGenres }] = useQueries([
		{
			queryKey: ['movieGenres'],
			queryFn: getGenres,
			enabled: form.media === '' || form.media === 'movie',	
		},
		{
			queryKey: ['tvGenres'],
			queryFn: getTVShowGenres,
			enabled: form.media === '' || form.media === 'tvShow',
		}
	]);

	/* 
	 * Combine useQueries to call getSearchResults to Fetch Movies and TV Shows based on the search form
	 * https://tanstack.com/query/latest/docs/framework/react/reference/useQueries
	 * 1. Monitors the form element state to determine which media type to fetch
	 * 2. Fetch Movies and TV Shows based on the search form
	 * 3. Keep the previous data when fetching the next page
	 * 4. Monitors Loading, Error, and Previous Data states
	 */
	const [{ data: movieResults, error: movieError, isLoading: movieLoading, isError: isMovieError, isPreviousData: isMoviePreviousData }, 
		   { data: tvShowResults, error: tvShowError, isLoading: tvShowLoading, isError: istvShowError, isPreviousData: istvShowPreviousData }] = useQueries([
		{
			queryKey: ['movieResults', page, form.media, form.genre, form.release_date_from, form.release_date_to, form.vote_average, form.sort_by, form.with_keywords],
			queryFn: () => getSearchResults(page, form.media, form.genre, form.release_date_from, form.release_date_to, form.vote_average, form.sort_by, form.with_keywords),
			keepPreviousData: true,
			enabled: form.media === '' || form.media === 'movie',	
		},
		{
			queryKey: ['tvResults', pageTV, form.media, form.genre, form.release_date_from, form.release_date_to, form.vote_average, form.sort_by, form.with_keywords],
			queryFn: () => getSearchResults(pageTV, form.media, form.genre, form.release_date_from, form.release_date_to, form.vote_average, form.sort_by, form.with_keywords),
			keepPreviousData: true,
			enabled: form.media === '' || form.media === 'tvShow',
		}
	]);

	// Display a spinner when loading
	if (movieLoading || tvShowLoading) {
		return <Spinner />;
	}

	// Display an error message when there is an error
	if (isMovieError) {
		return <h1>{(movieError as Error).message}</h1>;
	}

	if (istvShowError) {
		return <h1>{(tvShowError as Error).message}</h1>;
	}

	// This is the logic to determine which genres to use based on the media type
	const genres = form.media === 'tvShow' ? tvShowGenres?.genres || [] : movieGenres?.genres || [];
	const genreOptions = [{ id: "", name: "Select Genre" }, ...(genres || [])];

	// Generate Ratings from 1 to 10	
	const ratingOptions = Array.from({ length: 10 }, (_, i) => i + 1);

	/*
	 * Generate yearOption which has two values from 1900 to the current year
	 * 1. yearOptions: 1888 to 2024
	 * 2. Declare yearToOptions and yearFromOptions to be equal to yearOptions
	 * 3 yearToOptions and yearFromOptions are used to set the release_date_from and release_date_to values
	 * */
	const yearOptions = Array.from({ length: 2024 - 1888 + 1 }, (_, i) => 2024 - i);	
	let yearToOptions = yearOptions;
	let yearFromOptions = yearOptions;

	// Set the sortOptions based on the media type
	const sortOptions = form.media === 'tvShow' ? tvSort : movieSort;

	// Extract the movies and tvShows from the search results
	const movies = movieResults ? movieResults.results : [];
	const tvShows = tvShowResults ? tvShowResults.results : [];

	// Function to make input changes
	const makeInputChange = ({ name, value }: { name: string; value: string }) => {
		setForm({
			...form,
			[name]: value,
		});
	};

	/* Function to handle input change
	* 1. Extract the name and value from the event
	* 2. If the release_date_from is greater than release_date_to, reset the search
	* 3. If the release_date_to is less than release_date_from, reset the search
	* 4. Make the input change
	* 5. Reset the search if the media type is changed
	*/
	const handleInputChange = async (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
	  const name = event.target.name as keyof typeof form;
	  const value = event.target.value as string;

		console.log('before');
	  // if release_date_from it greater than release_date_to, set release_date_to to release_date_from
	  if (name === 'release_date_from' && Number(form.release_date_to) < Number(value)) {
		if (form.media === 'movie') {
			resetMovieSearch();
		} else if (form.media === 'tvShow') {
			resetTVShowSearch();
		}
		//  handleAlert("error", "Playlist already exists. Please try a different name.", true);
		setFormError('RELEASE DATE FROM CANNOT BE GREATER THAN RELEASE DATE TO');
	  } else if (name === 'release_date_to' && Number(form.release_date_from) > Number(value)) {
		if (form.media === 'movie') {
			resetMovieSearch();
		} else if (form.media === 'tvShow') {
			resetTVShowSearch();
		}
		// handleAlert("error", "Playlist already exists. Please try a different name.", true);
		setFormError('RELEASE DATE TO CANNOT BE LESS THAN RELEASE DATE FROM.');
	  } else {
		makeInputChange({ name, value });
	  }

	  // Reset the error after 3 seconds
	  setTimeout(() => {
		setFormError('');
		}, 5000);
	  
	 // Reset the search if the media type is changed
	  if (name === 'media' && value === 'movie') {
		resetMovieSearch();
	  }
	  if (name === 'media' && value === 'tvShow') {
		resetTVShowSearch();
	  }
	};

	// Function to reset the search form
	const resetTVShowSearch = () => {
		setPageTV(1);
		setForm({
			...form,
			media: 'tvShow',
			with_keywords: '',
			genre: '',
			release_date_from: '1888',
			release_date_to: '2024',
			watch_region: '',
			vote_average: '',
			sort_by: '',
		});
	}

	// Function to reset the search form
	const resetMovieSearch = () => {
		setPage(1);
		setForm({
			...form,
			media: 'movie',
			with_keywords: '',
			genre: '',
			release_date_from: '1888',
			release_date_to: '2024',
			watch_region: '',
			vote_average: '',
			sort_by: '',
		});
	}

	// Function to handle Reset Search Button
	const onSubmit = async () => {
        try {
			if (form.media === 'movie') {
				resetMovieSearch();
			} else if (form.media === 'tvShow') {
				resetTVShowSearch();
			}		
		} catch (err) {
            console.error(err);
        }
    }; 
	 

	// Used to handle Movie and TV Show Pagination
	const prevPage = () => setPage((prev) => prev - 1);
	const nextPage = () => setPage((next) => next + 1);
	const prevPageTV = () => setPageTV((prev) => prev - 1);
	const nextPageTV = () => setPageTV((next) => next + 1);

	return (
	<>
	{/* <Snackbar 
		TransitionComponent={SlideTransition}
		open={alert} 
		// autoHideDuration={2500} 
		onClose={handleAlertClose}
		anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
	>
		<Alert onClose={handleAlertClose} variant="filled" severity={alertSeverity}  sx={{ width: '100%' }}>
		{alertMessage} 
		</Alert>
	</Snackbar> */}
	<Grid container>
      <Grid item xs={2}>
        <Box sx={styles.customBoxLeft}>
          <Typography 
			variant="h4" 
			component="h3" 
			align="center" 
			sx={styles.title}
		  >
            SEARCH
          </Typography>
          <Box sx={{ width: '100%', padding: theme.spacing(2) }}>
            <Box sx={{ width: '90%', marginBottom: theme.spacing(2) }}>
              <TextField 
				name="media" 
				label="SELECT MEDIA TYPE" 
				select 
				value={form.media} 
				onChange={handleInputChange}
				InputLabelProps={{
					sx: styles.labelText,
				}}
				fullWidth
			  >
                <MenuItem value="tvShow">TV Show</MenuItem>
                <MenuItem value="movie">Movie</MenuItem>
              </TextField>
            </Box>
			<Box sx={{ width: '90%', marginBottom: theme.spacing(2) }}>
			</Box>            
           	 <Box sx={{ width: '90%', marginBottom: theme.spacing(2) }}>
				<TextField 
					name="genre" 
					label="SELECT GENRE" 
					select 
					value={form.genre} 
					onChange={handleInputChange}
					InputLabelProps={{
						sx: styles.labelText,
					}}
					fullWidth
			 	 >
				{/* Map through genreOptions to display genre options */}
				{genreOptions.map((option) => (
					<MenuItem key={option.id} value={option.id}>
						{option.name}
					</MenuItem>
				))}
				</TextField>
            </Box>
			{formError && (
			<>
			<Box sx={{ width: '90%', marginBottom: theme.spacing(2) }}>	
				<Alert severity="error">
					<AlertTitle>ERROR: SEARCH RESET</AlertTitle>
					{formError}
				</Alert>
			</Box>
			</>
			)}
			<Box sx={{ width: '90%',display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
					<Box sx={{ width: '48%' }}>
						<TextField 
						name="release_date_from" 
						label="DATE FROM" 
						select 
						value={form.release_date_from} 
						onChange={handleInputChange}
						InputLabelProps={{
							sx: styles.labelText,
							shrink: true,						
						}}
						fullWidth
						>
						{yearFromOptions.map((year) => (
							<MenuItem key={year} value={year}>
							{year}
							</MenuItem>
						))}
						</TextField>
					</Box>
					<Box sx={{ width: '48%' }}>
						<TextField 
						name="release_date_to" 
						label="DATE TO" 
						select 
						value={form.release_date_to} 
						onChange={handleInputChange}
						InputLabelProps={{
							sx: styles.labelText,
							shrink: true,
						}}
						fullWidth
						>
						{yearToOptions.map((year) => (
							<MenuItem key={year} value={year}>
							{year}
							</MenuItem>
						))}
						</TextField>
					</Box>
			</Box>
			<Box sx={{ width: '90%', marginBottom: theme.spacing(2) }}>
				<TextField 
					name="vote_average" 
					label="SELECT RATING" 
					select 
					value={form.vote_average} 
					onChange={handleInputChange}
					InputLabelProps={{
						sx: styles.labelText,
					}}
					fullWidth
			 	 >
				{/* Map through genreOptions to display genre options */}
				{ratingOptions.map((rating) => (
					<MenuItem key={rating} value={rating}>
						{rating}
					</MenuItem>
				))}
				</TextField>
            </Box>
            <Box sx={{ width: '90%', marginBottom: theme.spacing(2) }}>
				<TextField 
					name="sort_by" 
					label="SORT BY" 
					select 
					value={form.sort_by} 
					onChange={handleInputChange}
					InputLabelProps={{
						sx: styles.labelText,
					}}
					fullWidth
			 	 >
				{/* Map through genreOptions to display genre options */}
				{sortOptions.map((option) => (
					<MenuItem key={option[1]} value={option[1]}>
						{option[0]}
					</MenuItem>
				))}
				</TextField>
            </Box>		
		  	<Box sx={{ width: '90%', marginBottom: theme.spacing(2) }}>				
				<Button 
					sx={styles.button} 
					fullWidth 
					variant="contained" 
					onClick={onSubmit}>
						RESET SEARCH
				</Button>
			</Box>
          </Box>
        </Box>
	</Grid>
	<Grid item xs={10}>
		{/* Your main content here */}
		<Box>
			<Box sx={{ bgcolor: 'background.paper', p: 0, position: 'sticky', top: 0, zIndex: 1 }}>
			{form.media === 'movie' ? (
				<>
				{/* Header for Movies */}
				<Paper component="div" sx={styles.root}>
					<Grid container sx={{ paddingX: 0 }}>
						<Grid item>
							<IconButton onClick={prevPage} disabled={isMoviePreviousData || page === 1}
								aria-label="go back"
							>
								<KeyboardDoubleArrowLeftSharpIcon 
								color={isMoviePreviousData || page === 1 ? "disabled" : "secondary"} 
								style={{ fontSize: 50, fontWeight: 'bold' }}
								/>
							</IconButton>
						</Grid>

						<Grid item xs>
							<Typography variant="h4" component="h3" align="center" sx={styles.titleText}>
								MOVIES
							</Typography>
						</Grid>

						<Grid item>
							<Typography align="right" sx={styles.pageNumberText}>
								{page} of {movieResults?.total_pages}
							</Typography>
						</Grid>

						<Grid item>
							<IconButton onClick={nextPage} disabled={isMoviePreviousData || page === movieResults?.total_pages}
								aria-label="go forward"
							>
								<KeyboardDoubleArrowRightSharpIcon 
								color={isMoviePreviousData || page === movieResults?.total_pages ? "disabled" : "secondary"}  
								style={{ fontSize: 50, fontWeight: 'bold' }}
								/>
							</IconButton>
						</Grid>
					</Grid>
				</Paper> 
				</>
			) : form.media === 'tvShow' ? (
				<>
				{/* Header for Movies */}
				<Paper component="div" sx={styles.root}>
					<Grid container sx={{ paddingX: 0 }}>
						<Grid item>
							<IconButton onClick={prevPageTV} disabled={istvShowPreviousData || pageTV === 1}
								aria-label="go back"
							>
								<KeyboardDoubleArrowLeftSharpIcon 
								color={istvShowPreviousData || pageTV === 1 ? "disabled" : "secondary"} 
								style={{ fontSize: 50, fontWeight: 'bold' }}
								/>
							</IconButton>
						</Grid>

						<Grid item xs>
							<Typography variant="h4" component="h3" align="center" sx={styles.titleText}>
								TV SHOWS
							</Typography>
						</Grid>

						<Grid item>						
							<Typography align="right" sx={styles.pageNumberText}>
								{pageTV} of {tvShowResults?.total_pages}
							</Typography>
						</Grid>

						<Grid item>
							<IconButton onClick={nextPageTV} disabled={istvShowPreviousData || pageTV === tvShowResults?.total_pages}
								aria-label="go forward"
							>
								<KeyboardDoubleArrowRightSharpIcon 
								color={istvShowPreviousData || pageTV === tvShowResults?.total_pages ? "disabled" : "secondary"}  
								style={{ fontSize: 50, fontWeight: 'bold' }}
								/>
							</IconButton>
						</Grid>
					</Grid>
				</Paper> 
				</>
			) : null}
			</Box>
			<Box sx={{ height: 'calc(100vh - 50px)', overflow: 'auto' }}>
			{form.media === 'movie' ? (
				// When the media type is movie, display the Movies ListPageTemplate component
				<PageTemplate
					movies={movies}
					action={(movie: BaseMovieProps) => {
						return <AddToFavouritesIcon {...movie} />;
					}}
				/>
				) : form.media === 'tvShow' ? (
				// When the media type is tvShow, display the TV SHow ListPageTemplate component
				<PageTemplateTVShow
					title=''
					tvShows={tvShows}
					action={(tvShow: BaseTvShowProps) => {
						return <AddToTVShowFavouritesIcon {...tvShow} />;
					}}
				/>
				) : null}
			</Box>
		</Box>
      </Grid>
    </Grid>
	</>
	);
};
export default HomePage;
