import React, { PropTypes } from 'react';
import { Item } from 'semantic-ui-react';
import MovieItem from './MovieItem';

const { Group } = Item;

const MovieList = props => {
  const { movies } = props;
  return (
    <Group>
      {
        movies.map((movie) => <MovieItem key={movie.ID} movie={movie} />)
      }
    </Group>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array,
};
export default MovieList;
