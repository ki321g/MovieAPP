import React from "react";
import { useLocation } from "react-router-dom";
import TVShowPageTemplate from "../components/templateTVShowPage";
import TVShowReview from "../components/tvShowReview";

const TVShowReviewPage: React.FC = () => {
  const { state : {tvShow, review } } = useLocation()
  return (
    <TVShowPageTemplate tvShow={tvShow}>
      <TVShowReview {...review} />
    </TVShowPageTemplate>
  );
};

export default TVShowReviewPage;