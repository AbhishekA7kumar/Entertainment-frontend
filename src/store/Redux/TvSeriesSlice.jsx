import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_LOCAL_URL, TMDB_BASE_URL } from "../../constants";

const BASE_URL = TMDB_BASE_URL;

function fetchTmdbToken() {
  return localStorage.getItem("tmdbToken");
}
function fetchBookmarkToken() {
  return localStorage.getItem("entertainmentAppToken");
}

export const fetchAllTVSeries = createAsyncThunk(
  "tvSeries/fetchAllTVSeries",
  async (_, thunkAPI) => {
    try {
      const tmdbToken = fetchTmdbToken();
      console.info("fetchAllTVSeries:tmdbToken", tmdbToken);
      if (!tmdbToken) {
        return thunkAPI.rejectWithValue(
          "TMDB token not found in local storage."
        );
      }

      const requests = [
        axios.get(`${BASE_URL}/tv/popular`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/trending/tv/week`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/tv/airing_today`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
        axios.get(`${BASE_URL}/tv/on_the_air`, {
          headers: { Authorization: `Bearer ${tmdbToken}` },
        }),
      ];

      const results = await Promise.allSettled(requests);

      const [popular, trending, airingToday, onTheAir] = results.map((result) =>
        result.status === "fulfilled" ? result.value.data.results : []
      );

      return { popular, trending, airingToday, onTheAir };
    } catch (error) {
      console.error("Error fetching TV series:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.status_message || "Failed to fetch TV series."
      );
    }
  }
);

export const fetchAllTVSeriesBookmarks = createAsyncThunk(
  "tvSeries/fetchAllTVSeriesBookmarks",
  async (_, thunkAPI) => {
    try {
      console.info("fetchAllTVSeriesBookmarks called");
      const entertainmentAppToken = fetchBookmarkToken();

      if (!entertainmentAppToken) {
        return thunkAPI.rejectWithValue(
          "entertainmentAppToken token not found in local storage."
        );
      }

      const result = await axios.get(`${BASE_LOCAL_URL}/tv/bookmarks`, {
        headers: { Authorization: `Bearer ${entertainmentAppToken}` },
      });
      // console.log(result);
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

// Redux Slice for TV Series
const tvSeriesSlice = createSlice({
  name: "tvSeries",
  initialState: {
    popular: [], // updated state key
    trending: [],
    airingToday: [],
    onTheAir: [],
    searchedTVSeries: [],
    loading: false,
    error: null,
    tvSeriesBookmarks: [],
  },
  reducers: {
    setSearchedTVSeries(state, action) {
      // console.log('action.payload', action.payload);
      state.searchedTVSeries = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTVSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTVSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload.popular;
        state.trending = action.payload.trending;
        state.airingToday = action.payload.airingToday;
        state.onTheAir = action.payload.onTheAir;
      })
      .addCase(fetchAllTVSeriesBookmarks.fulfilled, (state, action) => {
        state.tvSeriesBookmarks = action.payload;
        state.loading = false;
      })
      .addCase(
        fetchAllTVSeries.rejected || fetchAllTVSeriesBookmarks.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setSearchedTVSeries } = tvSeriesSlice.actions;
export default tvSeriesSlice.reducer;
