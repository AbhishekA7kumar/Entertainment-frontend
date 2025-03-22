import { BASE_LOCAL_URL } from "../../constants";


const toggleMovieBookmark = async (movie_id, bookmarked) => {
  console.info('toggleMovieBookmark called');
  const headers = new Headers();

  const entertainmentAppToken = localStorage.getItem('entertainmentAppToken');

  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${entertainmentAppToken}`);

  const raw = JSON.stringify({
    bookmark: !bookmarked
  });

  const url = `${BASE_LOCAL_URL}/movie/bookmark/${movie_id}`


  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return {
      isSuccess: true,
      result
    }
  } catch (error) {
    console.error(error);
  }
}

const toggleTVSeriesBookmark = async (movie_id, bookmarked) => {
  console.info('toggleMovieBookmark called');
  const headers = new Headers();

  const entertainmentAppToken = localStorage.getItem('entertainmentAppToken');

  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${entertainmentAppToken}`);

  const raw = JSON.stringify({
    bookmark: !bookmarked
  });

  const url = `${BASE_LOCAL_URL}/tv/bookmark/${movie_id}`


  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return {
      isSuccess: true,
      result
    }
  } catch (error) {
    console.error(error);
  }
}

export {
  toggleMovieBookmark, toggleTVSeriesBookmark
}