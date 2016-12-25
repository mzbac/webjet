import Rx from 'rxjs';
import {
  GETCHEAPESTMOVIESSTART,
  SEARCHMOVIEINPUT,
  GETCHEAPESTMOVIESCOMPLETE,
  SEARCHMOVIE,
  GETCHEAPESTMOVIESFAIL,
} from './types';
import {
  fetchMoviesEndPoint,
  fetchMoviesDebounceTime,
  searchMoviesThrottleTime,
} from '../config';
import { getCheapestMoviesFromMovies } from '../utils';

export const getCheapestMoviesAction = () => ({ type: GETCHEAPESTMOVIESSTART });
export const searchMovieAction = (evt) => ({ type: SEARCHMOVIEINPUT, payload: evt });

// epic
export const getCheapestMoviesEpic = action$ =>
  action$.ofType(GETCHEAPESTMOVIESSTART)
    .debounceTime(fetchMoviesDebounceTime)
    .switchMap(term => Rx.Observable.fromPromise(
      fetch(fetchMoviesEndPoint)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          }
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        })
        .then((response) => response.json())
        .catch((error) => ({ error }))
    ))
    .map(res => {
      if (res.error) {
        return { type: GETCHEAPESTMOVIESFAIL, payload: res.error };
      }
      return { type: GETCHEAPESTMOVIESCOMPLETE, payload: getCheapestMoviesFromMovies(res) };
    });

export const searchMovieEpic = action$ =>
  action$.ofType(SEARCHMOVIEINPUT)
    .map(e => e.payload.target.value)
    .throttleTime(searchMoviesThrottleTime)
    .distinctUntilChanged()
    .map(action => ({ type: SEARCHMOVIE, payload: action }));
