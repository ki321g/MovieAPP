import React, { useState }  from 'react';
import PageTemplate from '../components/templateTVShowListPage';
import { getTvShowsPopular } from '../api/tmdb-api';
import useFiltering from '../hooks/useFiltering';
import AddToTVShowFavouritesIcon from '../components/cardIcons/addToTVShowFavourites';
import TVShowFilterUI, {
	titleFilter,
	genreFilter,
} from '../components/tvShowFilterUI';
import { PopularTvShows } from '../types/interfaces';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { BaseTvShowProps } from '../types/interfaces';
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SortTVShowsUI from "../components/sortTVShowsUi";


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
	titleText: {
		fontFamily: '"Source Sans Pro", Arial, sans-serif',
		fontSize: '2.8rem',
		color: "#ffffff",
		textAlign: 'center',
		letterSpacing: 'normal',
		width:'100%',
		margin: '0',
		padding: '0',
		fontWeight: 'bold',
		textTransform: 'uppercase',
	},
	
};

const titleFiltering = {
	name: 'title',
	value: '',
	condition: titleFilter,
}; 
const genreFiltering = {
	name: 'genre',
	value: '0',
	condition: genreFilter,
};

const PopularTVShows: React.FC = () => {
	const [page, setPage] = useState(1);
	const [sortOption, setSortOption] = useState<string>("none");
	
	const { data, error, isLoading, isError, isPreviousData } = useQuery<PopularTvShows, Error>({
		queryKey: ["/tv/popularTvShows", page],
		queryFn: () => getTvShowsPopular(page),
		keepPreviousData: true
	});

	const { filterValues, setFilterValues, filterFunction } = useFiltering(
		[titleFiltering, genreFiltering]
	);
	
	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <h1>{error.message}</h1>;
	}

	const changeFilterValues = (type: string, value: string) => {
		const changedFilter = { name: type, value: value };
		const updatedFilterSet =
			type === 'title'
				? [changedFilter, filterValues[1]]
				: [filterValues[0], changedFilter];
		setFilterValues(updatedFilterSet);
	};

	const tvShows = data ? data.results : [];
	const displayedTVShows = filterFunction(tvShows);	


	// Sort movies
	const sortedTVShows = [...displayedTVShows].sort((a, b) => {
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
	

	const prevPage = () => setPage((prev) => prev - 1);
	const nextPage = () => setPage((next) => next + 1);

	return (
		<>			
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
						<Typography variant="h4" component="h3" align="center" sx={styles.titleText}>
                            Popular TV Shows
						</Typography>
					</Grid>

					<Grid item>					
						<Typography align="right" sx={{ paddingRight: 2 }}>
							{page} of {data?.total_pages}						
						</Typography>
					</Grid>

					<Grid item>
						<IconButton onClick={nextPage} disabled={isPreviousData || page === data?.total_pages}
							aria-label="go forward"
						>
							<KeyboardDoubleArrowRightSharpIcon 
							color={isPreviousData || page === data?.total_pages ? "disabled" : "secondary"}  
							style={{ fontSize: 50, fontWeight: 'bold' }}
							/>
						</IconButton>
					</Grid>
				</Grid>
			</Paper>
			<PageTemplate
				title='Popular TV Shows'
				tvShows={sortedTVShows}
				action={(tvShow: BaseTvShowProps) => {
					return <AddToTVShowFavouritesIcon {...tvShow} />;
				}}
			/>
			<TVShowFilterUI
				onFilterValuesChange={changeFilterValues}
				titleFilter={filterValues[0].value}
				genreFilter={filterValues[1].value}
			/>
			<SortTVShowsUI onSortChange={changeSortOption} />
		</>
	);
};
export default PopularTVShows;
