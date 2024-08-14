import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieVideos } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps, MovieTrailerVideoProps } from "../types/interfaces";

const MovieDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: movie, error: movieError, isLoading: movieLoading, isError:isMovieError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );

  // Check if movie is defined and has an id before running useQuery
   const { data: videoData, error: videoError, isLoading: videoLoading, isError: isVideoError } = useQuery<{ videos: { key: string; site: string; type: string }[] },
    Error
    >(["videos", movie?.id], () => getMovieVideos(movie?.id), { enabled: !!movie });

    // const { data: videoData, error: videoError, isLoading: videoLoading, isError: isVideoError } = useQuery<{ videos: { key: string; site: string; type: string }[] },
    // Error
    // >(["videos", movie?.id], () => getMovieVideos(movie?.id), { enabled: !!movie });
  
  if (movieLoading || videoLoading) {
    return <Spinner />;
  }
  
  if (isMovieError) {
    return <h1>{movieError.message}</h1>;
  }
  
  if (isVideoError) {
      return <h1>{videoError.message}</h1>;
  }

  // Find the trailer video
  const trailerVideo: MovieTrailerVideoProps = videoData?.videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  console.log('trailer: ', trailerVideo)
  // console.log(movie);

  return (
    <>
      {movie ? (
        <>
        <PageTemplate movie={movie}> 
            <MovieDetails movie={movie} trailerVideo={trailerVideo} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;