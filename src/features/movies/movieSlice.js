import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { APIKEY } from "../../common/api/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi
      .get(`?apiKey=${APIKEY}&s=${term}&type=movie`)
      .catch((err) => console.log("Err:" + err));

    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await movieApi
      .get(`?apiKey=${APIKEY}&s=${term}&type=series`)
      .catch((err) => console.log("Err:" + err));

    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetails = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetails",
  async (id) => {
    const response = await movieApi
      .get(`?apiKey=${APIKEY}&i=${id}&plot=full`)
      .catch((err) => console.log("Err:" + err));

    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched successfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, { payload }) => {
      console.log("Fetched successfully");
      return { ...state, selectedMovieOrShow: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
