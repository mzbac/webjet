import { GETCHEAPESTMOVIES, SEARCHMOVIE } from './types';

export const getCheapestMovies = () => ({ type: GETCHEAPESTMOVIES });
export const searchMovie = (evt) => ({ type: SEARCHMOVIE, payload: evt.target.value });

// epic
export const getCheapestMoviesEpic = action$ =>
  action$.ofType(GETCHEAPESTMOVIES)
    .mergeMap(action => 'getCheapestMoviesEpic');

export const searchMovieEpic = action$ =>
  action$.ofType(SEARCHMOVIE)
    .mergeMap(action => 'searchMovieEpic');