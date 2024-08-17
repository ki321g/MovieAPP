import React from "react";
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from "./theme/palette";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
// Contexts
import AuthProvider from "./contexts/authContext";
import MoviesContextProvider from "./contexts/moviesContext";
// Components 
import ProtectedRoute from './components/protectedRoute';
import SiteHeader from './components/siteHeader';
// Routes/Pages
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import PlaylistMoviesPage from "./pages/playlistMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import NowPlayingMoviesPage from './pages/nowPlayingMoviesPage' 
import TopRatedMoviesPage from './pages/topRatedMoviesPage' 
import PopularMoviesPage from './pages/popularMoviesPage' 
import DiscoverMoviesPage from "./pages/discoverMoviesPage";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import FantasyMoviePage from './pages/fantasyMoviePage';
import TVShows from './pages/tvShowPage';
import TVShowDetailsPage from './pages/tvShowDetailsPage';
import TVShowReviewPage from './pages/tvShowReviewPage';
import AiringTodayTVShows from './pages/tvShowAiringTodayPage';
import OnTheAirTVShows from './pages/tvShowOnTheAir';
import PopularTVShows from './pages/tvShowPopular';
import TopRatedTVShows from './pages/tvShowTopRated';
import LoginPage from "./pages/loginPage";
import ActorPage from "./pages/actorDetailsPage";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={createTheme({ palette })}>
        <BrowserRouter>
          <AuthProvider>
            <SiteHeader /> 
            <MoviesContextProvider>
              <Routes>
                {/* Movie Routes */}
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/discover" element={<DiscoverMoviesPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/nowplaying" element={<NowPlayingMoviesPage />} /> 
                <Route path="/movies/toprated" element={<TopRatedMoviesPage />} /> 
                <Route path="/movies/popular" element={<PopularMoviesPage />} />
                <Route path="/movies/favourites" element={
                  <ProtectedRoute>
                    <FavouriteMoviesPage />
                  </ProtectedRoute>
                } />
                <Route path="/movies/playlists" element={
                  <ProtectedRoute>
                    <PlaylistMoviesPage />
                  </ProtectedRoute>
                } />
                <Route path="/fantasymovie" element={
                  <ProtectedRoute>
                    <FantasyMoviePage />
                  </ProtectedRoute>
                } />
                {/* TV Show Routes */}
                <Route path="/tv/:id" element={<TVShowDetailsPage />} />
                <Route path="/tv" element={<TVShows />} />
                <Route path="/tv/airing-today" element={<AiringTodayTVShows />} /> 
                <Route path="/tv/on-the-air" element={<OnTheAirTVShows />} />
                <Route path="/tv/popular" element={<PopularTVShows />} /> 
                <Route path="/tv/top-rated" element={<TopRatedTVShows />} /> 
                {/* Review Routes */}                
                <Route path="/reviews/movie/:id" element={<MovieReviewPage/>} />
                <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
                <Route path="/reviews/tv/:id" element={<TVShowReviewPage />} />
                {/* Other Routes */}
                <Route path="/actor/:id" element={<ActorPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)