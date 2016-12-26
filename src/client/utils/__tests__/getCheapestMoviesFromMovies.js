/* global describe it expect */
import _ from 'lodash';
import getCheapestMoviesFromMovies from '../getCheapestMoviesFromMovies';
import movies from './movies.json';

const targetMovieTitle = 'Star Wars: Episode IV - A New Hope';
const targetMovieID = 'fw0076759';

describe('utils getCheapestMoviesFromMovies.', () => {
  it('getCheapestMoviesFromMovies can return correct movies ', () => {
    const cheapestMovies = getCheapestMoviesFromMovies(movies);
    expect(cheapestMovies.length).toBe(7);
    expect(_.find(cheapestMovies, (v) => {
      return v.Title === targetMovieTitle;
    }).ID).toBe(targetMovieID);
  });
});
