import React from 'react';
import PageTemplate from '../components/templateTVShowListPage';
import { getTvShowsAiringToday } from '../api/tmdb-api';

import AddToTVShowFavouritesIcon from '../components/cardIcons/addToTVShowFavourites';

import { AiringTodayTvShows } from '../types/interfaces';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { BaseTvShowProps } from '../types/interfaces';



const AiringTodayTVShows: React.FC = () => {
	const { data, error, isLoading, isError } = useQuery<AiringTodayTvShows, Error>(
		'airingTodayTvShows',
		getTvShowsAiringToday
	);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <h1>{error.message}</h1>;
	}
	
	const movies = data ? data.results : [];
	const displayedTVShows = movies;


	return (
		<>
			<PageTemplate
				title='TV Shows Airing Today'
				tvShows={displayedTVShows}
				action={(tvShow: BaseTvShowProps) => {
					return <AddToTVShowFavouritesIcon {...tvShow} />;
				}}
			/>
		</>
	);
};
export default AiringTodayTVShows;
