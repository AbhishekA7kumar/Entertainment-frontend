import { useEffect, useState } from "react";

import { MEDIA_TYPE, UI_MESSAGES } from "../../constants";
import { getBookmarkedMovies, getBookmarkedTVSeries } from "./api";
import style from './../../components/common-media/content.module.css';
import List from "../../components/Content/List";
import { getMovieApi } from "../movie/api";
import { getTvSeriesApi } from "../../components/tv/api.js";
import styles from '../../components/common-media/content.module.css';
import { InternalServerError } from "../InternalServerError";
import WelcomeSpinner from "../../components/Loading/LoaderSpinner.jsx";
import { GeneralLoading } from "../../components/Loading/GeneralLoading.jsx";
import { useOutletContext } from "react-router";

function Bookmarks() {
  const { searchQuery } = useOutletContext(); 

  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  // TODO: handle for bookmarked tv series.
  // TODO: handle unbookmark and bookmark
  const [bookmarkedTvSeries, setBookmarkedTvSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      try {
        setLoading(true);

        // Getting bookmared Movies and TV Series parellely
        const movies_promise = getBookmarkedMovies();
        const tv_serires_promise = getBookmarkedTVSeries();
        const [movieBookmarksResponse, tvSeriesBookmarksResponse] = await Promise.all([movies_promise, tv_serires_promise])

        const movieIds = [], tvSeriesIds = [];
        const bookmarkedMoviesPromises = [];
        const bookmarkedTVSeriesPromises = [];

        // Fetching all movies which are bookmarked
        movieBookmarksResponse.result.forEach(movieBookmark => {
          movieIds.push(movieBookmark.movie_id);
        });
        movieIds.forEach(id => {
          bookmarkedMoviesPromises.push(getMovieApi(id));
        });

        // Fetching all tv series which are bookmarked.
        tvSeriesBookmarksResponse.result.forEach(tvSeriesDataResponse => {
          tvSeriesIds.push(tvSeriesDataResponse.tv_series_id);
        });
        tvSeriesIds.forEach(id => {
          bookmarkedTVSeriesPromises.push(getTvSeriesApi(id));
        });

        // Waiting for all requests to complete
        const [bookmarkedMovies, bookmarkedTVSeries] = await Promise.all([
          Promise.all(bookmarkedMoviesPromises),
          Promise.all(bookmarkedTVSeriesPromises),
        ]);

        // Setting media_types
        const moviesWithMediaTypeAndBookmark = bookmarkedMovies.map(movie => ({
          ...movie.result,
          media_type: MEDIA_TYPE.MOVIES,
          bookmark: true,
        }));
        const tvSeriesWithMediaTypeAndBookmark = bookmarkedTVSeries.map(tvSeries => ({
          ...tvSeries.result,
          media_type: MEDIA_TYPE.TV_SERIES,
          bookmark: true,
        }));

        return [moviesWithMediaTypeAndBookmark, tvSeriesWithMediaTypeAndBookmark];

      } catch (error) {
        return <InternalServerError/>
      } finally {
        setLoading(false);
      }
    }

    getContent()
      .then(([movies, tvSeries]) => {
        setBookmarkedMovies(movies);
        setBookmarkedTvSeries(tvSeries);
      })
      .finally(() => setLoading(false));
  }, [])

  if (loading) return <GeneralLoading></GeneralLoading>
  

  const filteredMovies = bookmarkedMovies.filter(movie =>
    movie.title && movie.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter movies by title
  );
  
  const filteredTvSeries = bookmarkedTvSeries.filter(tvSeries =>
    tvSeries.title && tvSeries.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter tv series by title
  );

  

  if (loading)<WelcomeSpinner/>

  const noBookmarkMessage = () => {
    if (!bookmarkedMovies.length && !bookmarkedTvSeries.length) {
      return (
        <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] gap-y-5 home-width">
          <h1 className={`${styles.headings} mt-10`}>
            No Movies or TV Series Bookmarked.
          </h1>
        </div>
      );
    }
    if (!filteredMovies.length && !filteredTvSeries.length) {
      return (
        <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] gap-y-5 home-width">
          <h1 className={`${styles.headings} mt-10`}>
            No Movies or TV Series Match Your Search.
          </h1>
        </div>
      );
    }
    if (searchQuery) {
      return (
        <div className="ml-4 Bookmarks">
          <h1 className={`${styles.headings} mt-10`}>
            Search Results from Bookmarked Movies and TV Series
          </h1>
          <div className={style.content}>
            <List cards={[...filteredMovies, ...filteredTvSeries]} />
          </div>
        </div>
      );
    }
    return (
      <div className="ml-4 Bookmarks">
        <h1 className={`${styles.headings} mt-10`}>
          Bookmarked Movies and TV Series
        </h1>
        <div className={style.content}>
          <List cards={[...bookmarkedMovies, ...bookmarkedTvSeries]} />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="m-10">
        <h1>Loading</h1>
        <p>{UI_MESSAGES.RENDER_LOADING}</p>
      </div>
    );
  }

  return noBookmarkMessage();
}

export default Bookmarks;
