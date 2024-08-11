export interface BaseMovieProps {  
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language?: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
  genre?: string;
  productionCompany?: string;
  receivedAnOscar?: boolean;
};

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
};

export interface MovieDetailsProps extends BaseMovieProps {
  genres: {
    id: number;
    name: string;
  }[];
}
export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
};
  
export interface MoviePageProps {
  movie: MovieDetailsProps;
  images: MovieImage[];
};

export type FilterOption = "title" | "genre";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  
};

export interface Review{
  id: string;
  content: string
  author: string
};

export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
};
  
export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
};

export interface UpcommingMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
};

export interface NowPlayingMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
};

export interface PopularMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
};

export interface TopRatedMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
};

export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId: number,
};

export interface LoggedInUser {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  token: string | null;
};

export interface AuthContextInterface {
  user: any | null;
  token: string | null;  
  authenticate: () => void;
  signout: () => void;
  loading: boolean;
};
export interface UserPlaylist {
  id?: string;
  playlist: string;
  userId: string;
}
export interface Playlist {  
  id?: string;
  movie_id: number;
  movie_title: string;
  playlist_id: string;
  playlist_name: string;
  userId: string;
};

export interface PlaylistMovies {
  playlist_name: string;	
  results: BaseMovieProps[];
};


export interface BaseTvShowProps {
  name: string;
  id: number;
  original_language: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  backdrop_path?: string;
  genre_ids?: number[];
  favourite?: boolean;
  playlist?: boolean;
  // cast?: TvShowCastMember[];
}


export interface TvShowDetailsProps extends BaseTvShowProps {
  genres: {
    id: number;
    name: string;
  }[];
  number_of_seasons: number;
  number_of_episodes: number;
  tagline: string;
}


export interface TvImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}


export interface TVShowPageProps {
  tvShow: TvShowDetailsProps;
  images: TvImage[];
  name?: string;
  tagline?: string;
};

export interface DiscoverTvShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTvShowProps[];
}

export interface AiringTodayTvShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseTvShowProps[];
}

export interface BaseTvShowListProps {
  tvShows: BaseTvShowProps[];
  action?: (tvShow: BaseTvShowProps) => React.ReactNode;
}

export interface TVShowListPageTemplateProps extends BaseTvShowListProps {
  title: string;
}

export interface TvImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface FantasyMovieProps {  
  title?: string;
  budget?: number;
  homepage?: string | undefined;
  id?: string;
  imdb_id?: string;
  original_language?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  popularity?: number;
  poster_path?: string;
  backdrop_path?: string;
  tagline?: string;
  runtime?: number;
  revenue?: number;
  vote_count?: number;
  favourite?: boolean;
  genre_ids?: number[];
  genre?: string;
  productionCompany?: string;
  receivedAnOscar?: boolean;
};