import { combineEpics } from 'redux-observable';
import {
  getCheapestMoviesEpic,
  searchMovieEpic,
} from './movies';

export {
  getCheapestMoviesAction,
  searchMovieAction,
} from './movies';

export const rootEpic = combineEpics(
  getCheapestMoviesEpic,
  searchMovieEpic,
);

