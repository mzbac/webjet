import { combineReducers } from 'redux';
import {
  movies,
  searchedMovie,
} from './movies';

const rootReducer = combineReducers({
  movies,
  searchedMovie,
});

export default rootReducer;