import { combineEpics } from 'redux-observable';
import {
  getCheapestMoviesEpic,
  searchMovieEpic,
} from './movies';

export {
  getCheapestMovies,
  searchMovie,
} from './movies';

export const rootEpic = combineEpics(
  getCheapestMoviesEpic,
  searchMovieEpic,
);

