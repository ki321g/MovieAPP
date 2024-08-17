/*
 * This file contains the code to fetch data from the TMDB API
 */
// Gets the Movies from the API
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
			return getMoviesResults;
		})
		.catch((error) => {
			throw error;
		});
};

// Gets a Movie from the API by ID
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

// Get the genres from the API
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

// Get teh Movie Images from the API
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
		.then((json) => {
			//Filter out images that are not in English. Cant do it in call as it i loose the backdrop images
			const posters = (json.posters || []).filter((poster: any) => poster.iso_639_1 === 'en');
			const backdrops = json.backdrops || [];	
			return { posters, backdrops };
		  })
		.catch((error) => {
			throw error;
		});
};

// Get the Movie Videos from the API
export const getMovieVideos = (id?: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('failed to fetch videos');
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

// Get Similar Movies from the API
export const getSimilarMovies = (id: string | number, page: string | number) => {
	return fetch(
	  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
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
  
// Get the Reviews for a Movie from the API
export const getMovieReviews = (id: string | number) => {
	//movie id can be string or number
	return fetch(
		`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
	)
		.then((res) => res.json())
		.then((json) => {
			return json.results;
		});
};

/* Get the Upcoming Movies from the API
 * The API call is made to the /movie/upcoming endpoint. it isnt as good as teh /discover/movie endpoint
 * I wanted to use the discover endpoint but to show i used another endpoint i left it at /movie/upcoming
 * /discover/movie call and code needed commented out 
 */
export const getUpcomingMovies = (page: string | number) => {
	// // Get the current date
	// let todaysDate = new Date();

	// // Add 6 months to the current date
	// todaysDate.setMonth(todaysDate.getMonth() + 6);
  
	// // Format the date as YYYY-MM-DD
	// let minDate = todaysDate.toISOString().slice(0, 10);
	
	return fetch(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&region=&page=${page}`
		// `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${minDate}`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch movies. Response status: ${response.status}`
				);
			const getUpcomingMoviesResults = response.json();
			return getUpcomingMoviesResults;
		})
		.catch((error) => {
			throw error;
		});
};

// Get the Now Playing Movies from the API
export const getNowPlayingMovies = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&region=&page=${page}`
	)
		.then((response) => {
			if (!response.ok)
				throw new Error(
					`Unable to fetch movies. Response status: ${response.status}`
				);
			const getNowPlayingResults = response.json();
			return getNowPlayingResults;
		})
		.catch((error) => {
			throw error;
		});
};

// Get the Popular Movies from the API
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
			return getPopularResults;
		})
		.catch((error) => {
			throw error;
		});
};

// Get the Top Rated Movies from the API
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
			return getTopRatedResults;
		})
		.catch((error) => {
			throw error;
		});
};

// Get the TV Show from the API by ID
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

// Get the TV Show Images from the API
export const getTVShows = (page: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&with_original_language=en`
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

// Get the TV Show Reviews from the API
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

// GEt TV Show Genres from the API
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

// Get TV Shows Airing Today from the API
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
			return getTvShowsAiringTodayResults;
		})
		.catch((error) => {
			throw error;
		});
};

/* Get TV Shows On The Air from the API
 * Again Discover endpoint is better but i wanted to show another endpoint
 */
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

/* Get TV Shows Popular from the API
 * Again Discover endpoint is better but i wanted to show another endpoint
 */
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

/* Get TV Shows Top Rated from the API
 * Again Discover endpoint is better but i wanted to show another endpoint
 */
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
			return response.json();
		})
		.then((data) => {
		  if (Array.isArray(data.results)) {
			  data.results.sort((a: any, b: any) => new Date(b.vote_average).getTime() - new Date(a.vote_average).getTime());
			}
			return data ; // Return an object with the cast array
		  })
		.catch((error) => {
			throw error;
		});
};

// Get the TV Show Images from the API
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
		.then((json) => {
			//Filter out images that are not in English. Cant do it in call as it i loose the backdrop images
			let posters = (json.posters || []).filter((poster: any) => poster.iso_639_1 === 'en');
			// If posters length is 0 then set  posters back to json.posters
			if (posters.length === 0) {
				posters = json.posters;
			}
			const backdrops = json.backdrops || [];
			return { posters, backdrops };
		  })
		.catch((error) => {
			throw error;
		});
};

// Get Similar TV Shows from the API
export const getSimilarTVShows = (id: string | number, page: string | number) => {
	return fetch(
	  `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
	)
	.then((response) => {
		if (!response.ok) {
			console.log(`TV Show with ID ${id} not found.`);
			return [];
		}
		return response.json();
	})
	.catch((error) => {
		throw error;
	});
};

// Get the TV Show Videos from the API
export const getTVShowVideos = (id?: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('failed to fetch videos');
			}
			return response.json();
		})
		.then((json) => {
		  const tvShows = json.results || [];
		  return { tvShows };
		})
		.catch((error) => {
			throw error;
		});
};


// Actors/Cast
// Get the Movie Cast from the API
export const getMovieCast = (id: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('failed to fetch cast');
			}
			return response.json();
		})		
		.then((json) => {
			const cast = json.cast || [];
			return { cast }; // Return an object with the cast array
		  })
		.catch((error) => {
			throw error;
		});
};


// Get TV Show Cast from the API
export const getTVShowCast = (id: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('failed to fetch cast');
			}
			return response.json();
		})		
		.then((json) => {
			const cast = json.cast || [];
			return { cast }; // Return an object with the cast array
		  })
		.catch((error) => {
			throw error;
		});
};

// Get Actor from the API
export const getActor = (id: string | number) => {
	return fetch(
	  `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
	)
	  .then((response) => {
		if (!response.ok) {
		  throw new Error("failed to fetch actor data");
		}
		return response.json();
	  })
	  .catch((error) => {
		throw error;
	  });
  };

  // Get Actor Movie Credits from the API
export const getActorMovieCredits = (id: string | number) => {
	return fetch(
	`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
	)
	.then((response) => {
		if (!response.ok) {
		throw new Error("failed to fetch actor Movie credits");
		}
		return response.json();
	})	
	.then((data) => {
		if (Array.isArray(data.cast)) {
			data.cast = data.cast.filter((movie: any) => movie.poster_path != null);
			data.cast.sort((a: any, b: any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
		}
		return data ; // Return an object with the cast array
		})
	.catch((error) => {
		throw error;
	});
};

// Get Actor TV Show Credits from the API
export const getActorTVShowCredits = (id: string | number) => {
	return fetch(
		`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
	)
		.then((response) => {
		if (!response.ok) {
			throw new Error("failed to fetch actor TV Show credits");
		}
		return response.json();
		})	
		.then((data) => {
		if (Array.isArray(data.cast)) {
			data.cast = data.cast.filter((tvshow: any) => tvshow.poster_path != null);
			data.cast.sort((a: any, b: any) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime());
			}
			return data ; // Return an object with the cast array
		})
		.catch((error) => {
		throw error;
		});
	};

/*  Get the Search Results from the API
 *
 *  The function takes in the following parameters:
 *  - page: the page number
 * - media: the media type (movie or tvShow)
 * 	- genre: the genre id
 * 	- release_date_from: the release date from
 * 	- release_date_to: the release date to
 * 	- vote_average: the vote average
 * 	- sort_by: the sort by
 * 	- with_keywords: the keywords (NOt Currently Used Ran out of time)
 * 
 * The function then makes a call to the TMDB API to get the search results
 * the function builds the URL to fetch the data based on the parameters passed. 
 * 
 */
export const getSearchResults = (
	// the params for the moment (purely movie focused)
		page: string | number,
		media: string,
		genre: string,
		release_date_from: string,
		release_date_to: string,
		vote_average: string,
		sort_by: string,
		with_keywords: string
	) => {

	// Set gte (startDate) and lte (endDate) for the release date
	const startDate = release_date_from ? `${release_date_from}-01-01` : '';
	const endDate = release_date_to ? `${release_date_to}-12-31` : '';

	// Set the base URL for the API call
	let url = "";

	// Check if the media is a movie
	if (media === "movie") {
		url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&with_original_language=en&page=${page}`;
	}
	// Check if the media is a tv show
	if (media === "tvShow") {
		// the base url for the api call prior to any additional params (+= the params to add them to the url)
		url = `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&with_original_language=en&page=${page}`;
	}

	// Check if the genre is not null and add it to the url
	if (genre) {
		url += `&with_genres=${genre}`;
	  }
	
	// Check if the release date is not null and add it to the url
	if(release_date_from) {
		if (media === "movie") {
			url += `&primary_release_date.gte=${startDate}`;
		} else {
			url += `&first_air_date.gte=${startDate}`;
		}
	}

	// Check if the release date is not null and add it to the url
	if (release_date_to) {
		if (media === "movie") {
			url += `&primary_release_date.lte=${endDate}`;
		} else {
			url += `&first_air_date.lte=${endDate}`;
		}
	}

	// Check if the vote average is not null and add it to the url
	if (vote_average) {
		url += `&vote_average.gte=${vote_average}`;
	}

	// Check with_keywords is not null and add it to the url
	// Not currently used ran out of time
	if (with_keywords) {
		url += `&with_keywords=${with_keywords}`;
	}

	// Check if sort_by is not null and add it to the url
	if (sort_by) {
		url += `&sort_by=${sort_by}`;
	}
	
	// console.log("URL To Fetch:", url);

	return fetch(url)
	.then(res => res.json())
	.then(data => {
		// console.log("Response Data:", data);
		return data; 
	})
	.catch(err => {
		console.error("Error fetching data:", err);
		throw err;
	});
};
