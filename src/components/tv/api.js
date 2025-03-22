import { TMDB_BASE_URL } from "../../constants";

const getTvSeriesApi = async (tv_series_id) => {

  const tmdbToken = localStorage.getItem('tmdbToken');
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${tv_series_id}?language=en-US`, requestOptions);
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

const getTvSeriesCastApi = async (tv_series_id, tmdbToken) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${tv_series_id}/credits?language=en-US`, requestOptions);
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


export { getTvSeriesApi, getTvSeriesCastApi, getConfigurationSizesApi };
