/* global describe it expect */
import filterMoviesByTitle from '../filterMoviesByTitle';
import movies from './movies.json';

describe('utils filterMoviesByTitle.', () => {
  it('filterMoviesByTitle can return correct movies ', () => {
    const filteredMoives = filterMoviesByTitle(movies, 'A New Hope');
    expect(filteredMoives[0].ID).toBe('cw0076759');
  });
});