import { combineReducers } from 'redux';
import {
  movies,
  movieSearchingText,
  loadingState,
  fetchMovieError,
} from './movies';

const rootReducer = combineReducers({
  movies,
  movieSearchingText,
  loadingState,
  fetchMovieError,
});

export default rootReducer;
