import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import TVShowDetails from "../components/tvShowDetails";
import PageTemplate from "../components/templateTVShowPage";
import { getTVShow, getTVShowVideos } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { TvShowDetailsProps } from "../types/interfaces";

const TVShowDetailsPage: React.FC= () => {
  const { id } = useParams();
  const { data: tvShow, error: tvShowError, isLoading: tvShowLoading, isError: isTVShowError } = useQuery<TvShowDetailsProps, Error>(
    ["tvShow", id],
    ()=> getTVShow(id||"")
  );

  // Check if tvShow is defined and has an id before running useQuery
  const { data: videoData, error: videoError, isLoading: videoLoading, isError: isVideoError } = useQuery<{ tvShows: { key: string; site: string; type: string }[] }, Error >(["tvShows", tvShow?.id], () => getTVShowVideos(tvShow?.id), { enabled: !!tvShow });

  if (tvShowLoading || videoLoading) {
    return <Spinner />;
  }

  if (isTVShowError) {
    return <h1>{tvShowError.message}</h1>;
  }

  if (isVideoError) {
      return <h1>{videoError.message}</h1>;
  }
  
  // Find the trailer video
  const trailerVideo: any = videoData?.tvShows.find(video => video.type === 'Trailer' && video.site === 'YouTube') ?? undefined;
  // console.log('trailer: ', trailerVideo);

  return (
    <>
      {tvShow ? (
        <>
        <PageTemplate tvShow={tvShow}> 
            <TVShowDetails tvShow={tvShow} trailerVideo={trailerVideo} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default TVShowDetailsPage;