import { Map } from 'immutable';
import _ from 'lodash';
import v from 'voca';
import { movieIDPrefixIndex } from '../config';

const getCheapestMoviesFromMovies = (movies) => {
  const cheapestMoviesMap = movies.reduce((acc, cur) => {
    const { ID } = cur;
    const nonPrefixID = v.slice(ID, movieIDPrefixIndex);
    if (!acc.has(nonPrefixID)) return acc.set(nonPrefixID, cur);
    const oldMoviePrice = _.toNumber(acc.get(nonPrefixID).Price);
    if (isNaN(oldMoviePrice)) return acc;
    const currentMoviePrice = _.toNumber(cur.Price);
    if (isNaN(currentMoviePrice)) return acc;
    if (currentMoviePrice < oldMoviePrice) return acc.set(nonPrefixID, cur);
    return acc;
  }, Map());

  return cheapestMoviesMap.toArray();
};

export default getCheapestMoviesFromMovies;
