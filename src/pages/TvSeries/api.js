import { TMDB_BASE_URL } from "../../constants";
import { tokens } from "../../store/localstorage";

const getTVApi = async (tv_serieis_id) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tokens.tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${tv_serieis_id}?language=en-US`, requestOptions);
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

const getTVCastApi = async (tv_serieis_id) => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${tokens.tmdbToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(`${TMDB_BASE_URL}/tv/${tv_serieis_id}/credits?language=en-US`, requestOptions);
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



export { getTVApi, getTVCastApi };