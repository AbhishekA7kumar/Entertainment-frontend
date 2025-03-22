import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_LOCAL_URL, TMDB_BASE_URL } from "../../constants";

const BASE_TMDB_URL = TMDB_BASE_URL;
const BASE_ENTERTAINMENT_APP_URL = BASE_LOCAL_URL;

// fetching tmdbtokens in real time from local storage
function fetchTmdbToken() {
  return localStorage.getItem("tmdbToken");
}
function fetchBookmarkToken() {
  return localStorage.getItem("entertainmentAppToken");
}
export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async (_, thunkAPI) => {
    try {
      console.info("fetchAllMovies called");
      const tmdbToken = fetchTmdbToken();

      if (!tmdbToken) {
        return thunkAPI.rejectWithValue(
          "TMDB token not found in local storage."
        );
      }

      const requests = [
        axios.get(`${BASE_TMDB_URL}/movie/popular`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_TMDB_URL}/trending/movie/week`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_TMDB_URL}/movie/now_playing`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_TMDB_URL}/movie/upcoming`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
      ];

      const results = await Promise.allSettled(requests);

      const [popular, trending, nowPlaying, upcoming] = results.map((result) =>
        result.status === "fulfilled" ? result.value.data.results : []
      );

      return { popular, trending, nowPlaying, upcoming };
    } catch (error) {
      console.error("Error fetching movies:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.status_message || "Failed to fetch movies."
      );
    }
  }
);

export const fetchAllMovieBookmarks = createAsyncThunk(
  "movies/fetchAllMovieBookmarks",
  async (_, thunkAPI) => {
    try {
      console.info("fetchAllMovieBookmarks called");
      const entertainmentAppToken = fetchBookmarkToken();

      if (!entertainmentAppToken) {
        return thunkAPI.rejectWithValue(
          "entertainmentAppToken token not found in local storage."
        );
      }

      const result = await axios.get(
        `${BASE_ENTERTAINMENT_APP_URL}/movie/bookmarks`,
        {
          headers: { Authorization: `Bearer ${entertainmentAppToken}` },
        }
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.status_message ||
          "Failed to fetch movies' bookmarks."
      );
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    trendingMovies: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
    movieBookmarks: [],
    searchedMovies: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchedMovies(state, action) {
      state.searchedMovies = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Movies
      .addCase(fetchAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload.popular;
        state.trendingMovies = action.payload.trending;
        state.nowPlayingMovies = action.payload.nowPlaying;
        state.upcomingMovies = action.payload.upcoming;
      })
      .addCase(fetchAllMovieBookmarks.fulfilled, (state, action) => {
        state.movieBookmarks = action.payload;
      })
      .addCase(
        fetchAllMovieBookmarks.rejected || fetchAllMovies.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setSearchedMovies } = movieSlice.actions;
export default movieSlice.reducer;
