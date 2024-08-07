import React, { useContext, useEffect }  from 'react';
import PageTemplate from '../components/templateTVShowListPage';
import { getTVShows } from '../api/tmdb-api';
import useFiltering from '../hooks/useFiltering';
import AddToTVShowFavouritesIcon from '../components/cardIcons/addToTVShowFavourites';
import TVShowFilterUI, {
	titleFilter,
	genreFilter,
} from '../components/tvShowFilterUI';
import { DiscoverTvShows } from '../types/interfaces';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { BaseTvShowProps } from '../types/interfaces';

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

const TVShows: React.FC = () => {
	const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(
		'discoverTvShows',
		getTVShows
	);
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

	return (
		<>
			<PageTemplate
				title='Discover TV Shows'
				tvShows={displayedTVShows}
				action={(tvShow: BaseTvShowProps) => {
					return <AddToTVShowFavouritesIcon {...tvShow} />;
				}}
			/>
			<TVShowFilterUI
				onFilterValuesChange={changeFilterValues}
				titleFilter={filterValues[0].value}
				genreFilter={filterValues[1].value}
			/>
		</>
	);
};
export default TVShows;
