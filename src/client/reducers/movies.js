import { GETCHEAPESTMOVIES, SEARCHMOVIE } from '../actions/types';

export const movies = (state = [], action) => {
  switch (action.type) {
    case GETCHEAPESTMOVIES:
      return ['test'];

    default:
      return state;
  }
};

export const searchedMovie = (state = {}, action) => {
  switch (action.type) {
    case SEARCHMOVIE:
      return { result: 'test' };

    default:
      return state;
  }
};