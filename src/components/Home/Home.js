import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import movieApi from "../../common/api/movieApi";
import { APIKEY } from "../../common/api/MovieApiKey";
import { addMovies } from "../../features/movies/movieSlice";
import { MovieListing } from "../MovieListing/MovieListing";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await movieApi
        .get(`?apiKey=${APIKEY}&s=Harry&type=movie`)
        .catch((err) => console.log("Err:" + err));
      dispatch(addMovies(response.data));
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <div className="banner-image"></div>
      <MovieListing />
    </div>
  );
};
