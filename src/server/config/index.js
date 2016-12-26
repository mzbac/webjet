export const apiUrl = 'http://webjetapitest.azurewebsites.net/api/';
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
export const accessToken = 'sjd1HfkjU83ksdsm3802k';
export const requestDelay = 500;// retry request delay 500ms
export const requestTimeOut = 1000;// proxy request time out 1s
export const globalTimeout = 30000;// total response timeout 30s
export const enableMovieDetailsCache = true;
export const movieDetailsCacheTimeout = 60000;// timeout 60s
export const enableMovieListCache = true;
export const movieListCacheTimeout = 60000;// timeout 60s
