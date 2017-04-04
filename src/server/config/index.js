export const apiUrl = '';
export const cinemas = [
  {
    name: 'cinemaworld',
    prefix: 'cw',
  },
  {
    name: 'filmworld',
    prefix: 'fw',
  },
];
export const moviesListEndpoint = '/movies';
export const movieDetailEndpoint = '/movie/';
export const requestDelay = 0;// retry request delay 0ms
export const requestTimeOut = 1000;// proxy request time out 1s
export const globalTimeout = 30000;// total response timeout 30s for /movies request
export const enableMovieDetailsCache = true;// enable cache for retrieve movies list
export const movieDetailsCacheTimeout = 300000;// timeout 5 minutes
export const enableMovieListCache = true;// enable cache for retrieve movie details
export const movieListCacheTimeout = 300000;// timeout 5 minutes
