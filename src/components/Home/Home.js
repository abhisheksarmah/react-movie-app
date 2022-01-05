import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { MovieListing } from "../MovieListing/MovieListing";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncMovies("Harry"));
    dispatch(fetchAsyncShows("Friends"));
  }, [dispatch]);
  return (
    <div>
      <div className="banner-image"></div>
      <MovieListing />
    </div>
  );
};
