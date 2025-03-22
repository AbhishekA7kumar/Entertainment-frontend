import { TMDB_BASE_URL } from "../../constants";
import { tokens } from "../../store/localstorage";

const getMovieApi = async (movie_id) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tokens.tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movie_id}?language=en-US`, requestOptions);
    //  console.log(response);
    const result = await response.json()
    return {
      isSuccess: true,
      result: result
    };

  } catch (error) {
    console.error('Error: ', error);
    return {
      isSuccess: false,
      message: error.message
    }
  }
}

const getMovieCastApi = async (movie_id) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tokens.tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movie_id}/credits?language=en-US`, requestOptions);
    const result = await response.json()
    return {
      isSuccess: true,
      result: result
    };

  } catch (error) {
    console.error('Error: ', error);
    return {
      isSuccess: false,
      message: error.message
    }
  }
}

const getConfigurationSizesApi = async (tmdbToken) => {

  const url = `${TMDB_BASE_URL}/configuration`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbToken}`
    }
  };

  try {

    const response = await fetch(url, options);
    const result = await response.json();
    return {
      isSuccess: true,
      result: result
    };

  } catch (error) {
    console.error('Error: ', error);
    return {
      isSuccess: false,
      message: error.message
    }
  }
}


export { getMovieApi, getMovieCastApi, getConfigurationSizesApi };