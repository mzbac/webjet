import _ from 'lodash';
import v from 'voca';

const filterMoviesByTitle = (movies, serachText) => {
  return _.filter(movies, (movie) => v.matches(movie.Title, serachText, 'i'));
};

export default filterMoviesByTitle;
