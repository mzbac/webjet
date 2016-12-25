import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Loader } from 'semantic-ui-react';
import 'whatwg-fetch';
import MovieList from './MovieList';
import { getCheapestMoviesAction, searchMovieAction } from './actions';
import { filterMoviesByTitle } from './utils';
import styles from './App.css';


const App = props => {
  const {
    getCheapestMovies,
    searchMovie,
    movieSearchingText,
    movies,
    movieLoadingState,
  } = props;

  return (
    <div className={styles.container} >
      <Button
        primary
        className={styles.getMoviesBtn}
        onClick={getCheapestMovies}
      >
        Get Cheapest Movies
      </Button>
      <Input placeholder="Search on title..." onChange={searchMovie} className={styles.searchInput} />
      {movieLoadingState ?
        <Loader
          size="large"
          active as="div"
        >
          Loading movies
        </Loader>
        : <MovieList movies={filterMoviesByTitle(movies, movieSearchingText)} />}
    </div>
  );
};

App.propTypes = {
  getCheapestMovies: PropTypes.func.isRequired,
  searchMovie: PropTypes.func.isRequired,
  movieSearchingText: PropTypes.string,
  movies: PropTypes.array.isRequired,
  movieLoadingState: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    movieSearchingText: state.movieSearchingText,
    movieLoadingState: state.loadingState,
  };
};
export default connect(mapStateToProps, {
  getCheapestMovies: getCheapestMoviesAction,
  searchMovie: searchMovieAction,
})(App);

