import {
  GETCHEAPESTMOVIESSTART,
  GETCHEAPESTMOVIESCOMPLETE,
  GETCHEAPESTMOVIESFAIL,
  SEARCHMOVIE,
} from '../actions/types';

export const movies = (state = [], action) => {
  switch (action.type) {
    case GETCHEAPESTMOVIESCOMPLETE:
      return action.payload;

    default:
      return state;
  }
};

export const movieSearchingText = (state = '', action) => {
  switch (action.type) {
    case SEARCHMOVIE:
      return action.payload;

    default:
      return state;
  }
};

export const loadingState = (state = false, action) => {
  switch (action.type) {
    case GETCHEAPESTMOVIESSTART:
      return true;
    case GETCHEAPESTMOVIESCOMPLETE:
      return false;
    case GETCHEAPESTMOVIESFAIL:
      return false;
    default:
      return state;
  }
};
