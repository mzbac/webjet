import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Loader, Message } from 'semantic-ui-react';
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
    fetchMovieError,
  } = props;

  return (
    <div className={styles.container} >
      <Button
        primary
        disabled={movieLoadingState}
        className={styles.getMoviesBtn}
        onClick={getCheapestMovies}
      >
        Get Cheapest Movies
      </Button>
      <Input placeholder="Search on title..." onChange={searchMovie} className={styles.searchInput} />
      {fetchMovieError && <Message negative >
        <Message.Header>We&apos;re sorry we can&apos;t fetch movies data!</Message.Header>
        <p>{fetchMovieError}</p>
      </Message>}
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
  fetchMovieError: PropTypes.string,
};
const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    movieSearchingText: state.movieSearchingText,
    movieLoadingState: state.loadingState,
    fetchMovieError: state.fetchMovieError,
  };
};
export default connect(mapStateToProps, {
  getCheapestMovies: getCheapestMoviesAction,
  searchMovie: searchMovieAction,
})(App);

