import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  fetchAllMovieBookmarks,
  fetchAllMovies,
} from "../store/Redux/MovieSlice";
import style from "./../components/common-media/content.module.css";
import Trending from "./TrendingMovies/trending";
import List from "../components/Content/List";
import {
  clearSearchResults,
  searchMovies,
  searchTVSeries,
} from "../store/Redux/SearchSlice";
import {
  fetchAllTVSeries,
  fetchAllTVSeriesBookmarks,
} from "../store/Redux/TvSeriesSlice";
import { MEDIA_TYPE } from "../constants";
import { useLocation, useOutletContext } from "react-router-dom";
import { InternalServerError } from "./InternalServerError";
import { GeneralLoading } from "../components/Loading/GeneralLoading";

export default function HomePage() {
  const [popMovies, setPopMovies] = useState([]);
  const [mergedPopular, setMergedPopular] = useState([]);
  const [trendingMoviesLocal, setTrendingMoviesLocal] = useState([]);
  const [mergedTrending, setMergedTrending] = useState([]);

  const dispatch = useDispatch();
  const {
    searchedMovies,
    popularMovies,
    trendingMovies,
    movieBookmarks,
    loading: moviesLoading,
    error: moviesError,
  } = useSelector((state) => state.movies);

  const {
    trending: trendingTVSeries,
    popular: popularTVSeries,
    tvSeriesBookmarks,
    loading: tvSeriesLoading,
    error: tvSeriesError,
  } = useSelector((state) => state.tvSeries);

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllMovieBookmarks());
    dispatch(fetchAllTVSeries());
    dispatch(fetchAllTVSeriesBookmarks());
  }, []);

  // search implemented
  const { searchQuery } = useOutletContext();

  const { movies, tvSeries } = useSelector((state) => state.search);
 
  useEffect(() => {
    const id = setTimeout(() => {
      if (searchQuery) {
        dispatch(searchMovies(searchQuery));
        dispatch(searchTVSeries(searchQuery));
      } else {
        dispatch(clearSearchResults());
      }
    }, 1000);

    return function () {
      clearTimeout(id);
    };
  }, [searchQuery, dispatch]);

  useEffect(() => {
    const merged = [
      ...trendingMovies.map((movie) => ({
        ...movie,
        media_type: MEDIA_TYPE.MOVIES,
      })),
      ...trendingTVSeries.map((tv) => ({
        ...tv,
        media_type: MEDIA_TYPE.TV_SERIES,
      })),
    ];
    setMergedTrending(merged);
  }, [trendingMovies, trendingTVSeries]);
  // merging popularMovies & popularTVSeries
  useEffect(() => {
    const merged = [
      ...popularMovies.map((movie) => ({
        ...movie,
        media_type: MEDIA_TYPE.MOVIES,
      })),
      ...popularTVSeries.map((tv) => ({
        ...tv,
        media_type: MEDIA_TYPE.TV_SERIES,
      })),
    ];
    setMergedPopular(merged);
  }, [popularMovies, popularTVSeries]);

  /**
   * Used to add bookmark field.
   */
  const populateBookmark = useCallback(
    (content) => {
      if (content.media_type === MEDIA_TYPE.MOVIES) {
        let bookmark = false;
        const searchedMovie = movieBookmarks.find(
          (bookmarkObj) => bookmarkObj.movie_id === content.id
        );
        if (searchedMovie) {
          bookmark = searchedMovie.bookmark;
        }
        const updatedMovie = { ...content, bookmark };
        return updatedMovie;
      } else {
        let bookmark = false;
        const searchedTV = tvSeriesBookmarks.find(
          (bookmarkObj) => bookmarkObj.tv_series_id === content.id
        );
        if (searchedTV) {
          bookmark = searchedTV.bookmark;
        }
        const updatedTV = { ...content, bookmark };
        return updatedTV;
      }
    },
    [movieBookmarks, tvSeriesBookmarks]
  );

  /**
   * Used to add media_type field.
   */
  const setMediaType = (item) => {
    return {
      ...item,
      media_type: item.title ? MEDIA_TYPE.MOVIES : MEDIA_TYPE.TV_SERIES, // using tiltle to identify movies
    };
  };

  useEffect(() => {
    const sortedMergedPopular = mergedPopular
      .sort((a, b) => b.popularity - a.popularity)
      .map(setMediaType); // sorting via popularity
    const popularMoviesWithBookmark = sortedMergedPopular.map(populateBookmark);
    setPopMovies(popularMoviesWithBookmark);
  }, [mergedPopular, populateBookmark]);

  useEffect(() => {
    const trendingMoviesWithMediaType = mergedTrending
      .sort((a, b) => b.popularity - a.popularity)
      .map(setMediaType); // sorting via popularity
    const trendingMoviesWithBookmark =
      trendingMoviesWithMediaType.map(populateBookmark);
    setTrendingMoviesLocal(trendingMoviesWithBookmark);
  }, [mergedTrending, populateBookmark]);

  const processedSearchedMovies = movies.map((movie) => setMediaType(movie));
  const processedTvSeries = tvSeries.map((movie) => setMediaType(movie));

  if (moviesLoading) return <GeneralLoading></GeneralLoading>
  if (moviesError) return <InternalServerError/>;

  if (searchQuery && movies.length > 0) {
    return (
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className={style.headings}>Search Results</h1>
        <div className={style.content}>
          <List cards={[...processedSearchedMovies, ...processedTvSeries]} />
        </div>
      </div>
    );
  }
  return (
    <div className="">
      {/* Trending Section */}
      <div className="md:ml-4 p-4 ">
        <Trending trendingMovies={trendingMoviesLocal} />
      </div>

      <div className="md:ml-4 p-4  home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">
          Recommended for you
        </h1>
        <div className={style.content}>
          <List cards={popMovies} />
        </div>
      </div>
    </div>
  );
}
