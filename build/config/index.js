'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apiUrl = exports.apiUrl = 'http://webjetapitest.azurewebsites.net/api/';
var cinemas = exports.cinemas = [{
  name: 'cinemaworld',
  prefix: 'cw'
}, {
  name: 'filmworld',
  prefix: 'fw'
}];
var moviesListEndpoint = exports.moviesListEndpoint = '/movies';
var movieDetailEndpoint = exports.movieDetailEndpoint = '/movie/';
var accessToken = exports.accessToken = 'sjd1HfkjU83ksdsm3802k';
var requestDelay = exports.requestDelay = 0; // retry request delay 0ms
var requestTimeOut = exports.requestTimeOut = 1000; // proxy request time out 1s
var globalTimeout = exports.globalTimeout = 30000; // total response timeout 30s for /movies request
var enableMovieDetailsCache = exports.enableMovieDetailsCache = true; // enable cache for retrieve movies list
var movieDetailsCacheTimeout = exports.movieDetailsCacheTimeout = 300000; // timeout 5 minutes
var enableMovieListCache = exports.enableMovieListCache = true; // enable cache for retrieve movie details
var movieListCacheTimeout = exports.movieListCacheTimeout = 300000; // timeout 5 minutes
//# sourceMappingURL=index.js.map