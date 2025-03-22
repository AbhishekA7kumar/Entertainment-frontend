console.log('base url', process.env.REACT_APP_TMDB_BASE_URL)
console.log('base image url', process.env.REACT_APP_BASE_IMAGE_URL)
console.log('base local url', process.env.REACT_APP_BASE_LOCAL_URL)

export const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;
export const BASE_IMAGE_URL = process.env.REACT_APP_BASE_IMAGE_URL;
export const BASE_LOCAL_URL = process.env.REACT_APP_BASE_LOCAL_URL;


export const MEDIA_TYPE = {
  MOVIES : 'movie',
  TV_SERIES : 'tv-series'
}

export const UI_MESSAGES = {
  NO_MOVIES:"No Movies found.",
  NO_TV_SERIES: "No TV Series found.",
  RENDER_LOADING: `We use Free Version of Render service for backend.
      It may take upto 50 seconds for the service to get activated on initaly requests.`
};
// Action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
