import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './Redux/MovieSlice';
import tvSeriesReducer from './Redux/TvSeriesSlice'; 
import searchReducer from './Redux/SearchSlice';

const Store = configureStore({
  reducer: {
    movies: movieReducer, 
    tvSeries: tvSeriesReducer,
    search:searchReducer,  
  },
});

export default Store;
