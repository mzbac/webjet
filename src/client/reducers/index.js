import { combineReducers } from 'redux';
import {
  movies,
  movieSearchingText,
  loadingState,
} from './movies';

const rootReducer = combineReducers({
  movies,
  movieSearchingText,
  loadingState,
});

export default rootReducer;