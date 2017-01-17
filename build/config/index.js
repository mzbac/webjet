

Object.defineProperty(exports, '__esModule', {
  value: true,
});
const apiUrl = exports.apiUrl = 'http://webjetapitest.azurewebsites.net/api/';
const cinemas = exports.cinemas = [{
  name: 'cinemaworld',
  prefix: 'cw',
}, {
  name: 'filmworld',
  prefix: 'fw',
}];
const moviesListEndpoint = exports.moviesListEndpoint = '/movies';
const movieDetailEndpoint = exports.movieDetailEndpoint = '/movie/';
const accessToken = exports.accessToken = 'sjd1HfkjU83ksdsm3802k';
const requestDelay = exports.requestDelay = 0; // retry request delay 0ms
const requestTimeOut = exports.requestTimeOut = 1000; // proxy request time out 1s
const globalTimeout = exports.globalTimeout = 30000; // total response timeout 30s for /movies request
const enableMovieDetailsCache = exports.enableMovieDetailsCache = true; // enable cache for retrieve movies list
const movieDetailsCacheTimeout = exports.movieDetailsCacheTimeout = 300000; // timeout 5 minutes
const enableMovieListCache = exports.enableMovieListCache = true; // enable cache for retrieve movie details
const movieListCacheTimeout = exports.movieListCacheTimeout = 300000; // timeout 5 minutes
// # sourceMappingURL=index.js.map
