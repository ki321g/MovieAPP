export const getMovies = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&region=&include_adult=false&include_video=false&page=${page}`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch movies. Response status: ${response.status}`
				);
			const getMoviesResults = response.json();
			//console.log(getMoviesResults);
			return getMoviesResults;
		})
		.catch((error) => {
			throw error;
		});
};

export const getMovie = (id: string) => {
	return fetch(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Failed to get movie data. Response status: ${response.status}`
				);
			}
			return response.json();
		})
		.catch((error) => {
			throw error;
		});
};

export const getGenres = () => {
	return fetch(
		'https://api.themoviedb.org/3/genre/movie/list?api_key=' +
			import.meta.env.VITE_TMDB_KEY +
			'&language=en-US'
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch genres. Response status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			throw error;
		});
};

export const getMovieImages = (id: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('failed to fetch images');
			}
			return response.json();
		})
		// .then((json) => json.posters)
		.then((json) => {
			const posters = json.posters || [];
			const backdrops = json.backdrops || [];	
			return { posters, backdrops };
		  })
		.catch((error) => {
			throw error;
		});
};

export const getMovieVideos = (id?: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('failed to fetch images');
			}
			return response.json();
		})
		.then((json) => {
		  const videos = json.results || [];
		  return { videos };
		})
		.catch((error) => {
			throw error;
		});
};

export const getSimilarMovies = (id: string | number, page: string | number) => {
	return fetch(
	  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1&include_adult=false&page=${page}`
	)
	.then((response) => {
		if (!response.ok) {
			throw new Error(
				`Failed to get similar movie data. Response status: ${response.status}`
			);
		}
		return response.json();
	})
	.catch((error) => {
		throw error;
	});
};
  

export const getMovieReviews = (id: string | number) => {
	//movie id can be string or number
	return fetch(
		`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
	)
		.then((res) => res.json())
		.then((json) => {
			// console.log(json.results);
			return json.results;
		});
};

export const getUpcomingMovies = (page: string | number) => {
	// Get the current date
	let todaysDate = new Date();

	// Add 6 months to the current date
	todaysDate.setMonth(todaysDate.getMonth() + 6);
  
	// Format the date as YYYY-MM-DD
	let minDate = todaysDate.toISOString().slice(0, 10);
	console.log('Date: ', minDate)
  
	return fetch(
		// `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&region=&page=${page}`
		`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}`

	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch movies. Response status: ${response.status}`
				);
			const getUpcomingMoviesResults = response.json();
			//console.log(getMoviesResults);
			return getUpcomingMoviesResults;
		})
		.catch((error) => {
			throw error;
		});
};

export const getNowPlayingMovies = (page: string | number) => {
	// Get the current date
	let todaysDate = new Date()
	let toDate = new Date();

	// Add 6 months to the current date
	toDate.setMonth(todaysDate.getMonth() + 1);
  
	// Format the date as YYYY-MM-DD
	let minDate = todaysDate.toISOString().slice(0, 10);
	let maxDate = toDate.toISOString().slice(0, 10);

	console.log('Date minDate: ', minDate)
	
	console.log('Date maxDate: ', maxDate)

	return fetch(
		`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&region=&page=${page}`
		// `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&sort_by=primary_release_date.asc&release_date.gte=${minDate}&release_date.lte=${maxDate}` 

	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch movies. Response status: ${response.status}`
				);
			const getNowPlayingResults = response.json();
			//console.log(getMoviesResults);
			return getNowPlayingResults;
		})
		.catch((error) => {
			throw error;
		});
};

export const getPopularMovies = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&region=&page=${page}`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch movies. Response status: ${response.status}`
				);
			const getPopularResults = response.json();
			//console.log(getMoviesResults);
			return getPopularResults;
		})
		.catch((error) => {
			throw error;
		});
};

export const getTopRatedMovies = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&region=&page=${page}`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch movies. Response status: ${response.status}`
				);
			const getTopRatedResults = response.json();
			//console.log(getMoviesResults);
			return getTopRatedResults;
		})
		.catch((error) => {
			throw error;
		});
};

export const getTVShow = (id: string) => {
	return fetch(
		`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Failed to get  TV Show  data. Response status: ${response.status}`
				);
			}
			return response.json();
		})
		.catch((error) => {
			throw error;
		});
};

export const getTVShows = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch TV Shows. Response status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			throw error;
		});
};

export const getTVShowReviews = (id: string | number) => {
	//movie id can be string or number
	return fetch(
		`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
	)
		.then((res) => res.json())
		.then((json) => {
			return json.results;
		});
};

export const getTVShowGenres = () => {
	return fetch(
		`https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch genres. Response status: ${response.status}`
				);
			return response.json();
		})
		.catch((error) => {
			throw error;
		});
};

//   export const getSimilarTvShows = (id: string | number) => {
// 	return fetch(
// 	  `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1&include_adult=false&page=1`
// 	)
// 	  .then((res) => res.json())
// 	  .catch((error) => {
// 		throw error;
// 	  });
//   };

//   export const getTvShowsAiringToday = (page: string | number) => {
// 	return fetch(
// 		`https://api.themoviedb.org/3/tv/airing_today?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
// 	)
// 	  .then((res) => res.json())
// 	  .then((json) => {
// 		console.log(json.results);
// 	  	return json.results;
// 	});
//   };

export const getTvShowsAiringToday = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/tv/airing_today?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&language=en-US&page=${page}`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch Tv Shows. Response status: ${response.status}`
				);
			const getTvShowsAiringTodayResults = response.json();
			
			
			//console.log(getMoviesResults);
			return getTvShowsAiringTodayResults;
		})
		.catch((error) => {
			throw error;
		});
};

export const getTvShowsOnTheAir = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/tv/on_the_air?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&language=en-US&page=${page}`
		//'https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&air_date.lte={max_date}&air_date.gte={min_date}' \

	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch Tv Shows. Response status: ${response.status}`
				);
			const TvShowsOnTheAirResults = response.json();
			return TvShowsOnTheAirResults;
		})
		.catch((error) => {
			throw error;
		});
};


export const getTvShowsPopular = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&language=en-US&page=${page}`
		// `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch Tv Shows. Response status: ${response.status}`
				);
			const TvShowsPopularResults = response.json();
			return TvShowsPopularResults;
		})
		.catch((error) => {
			throw error;
		});
};

export const getTvShowsTopRated = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&language=en-US&page=${page}`
		// `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=vote_average.desc&vote_count.gte=200`

	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch Tv Shows. Response status: ${response.status}`
				);
			const TvShowsTopRatedResults = response.json();
			return TvShowsTopRatedResults;
		})
		.catch((error) => {
			throw error;
		});
};

export const getTVShowImages = (id: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('failed to fetch images');
			}
			return response.json();
		})
		.then((json) => json.posters)
		.catch((error) => {
			throw error;
		});
};