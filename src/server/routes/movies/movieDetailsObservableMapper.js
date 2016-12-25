import rp from 'request-promise-native';
import Rx from 'rxjs';
import {
  apiUrl,
  cinemas,
  movieDetailEndpoint,
  accessToken,
  requestDelay,
  requestTimeOut,
} from '../../config';

const successRetrieveMoviesCallback = (allData) => {
  const movies = allData.reduce((accum, curr, index) => {
    const { Movies } = curr;
    const mappedMovies = Movies.map((movie) => {
      return { ...movie, cinema: cinemas[index] };
    });
    return [...accum, ...mappedMovies];
  }, []);
  const reqs = [];
  for (const movie of movies) {
    const { ID, cinema } = movie;
    const options = {
      uri: `${apiUrl}${cinema.name}${movieDetailEndpoint}${ID}`,
      headers: {
        'x-access-token': accessToken,
      },
      json: true,
    };

    reqs.push(Rx.Observable.defer(
      () => {
        return rp(options)
          .then((res) => ({ ...res, cinema }));
      })
      .timeout(requestTimeOut)
      .retryWhen((errors) => {
        console.log(`fetch movie details-${options.uri} fails`);// eslint-disable-line no-console
        return errors.delay(requestDelay);
      })
    );
  }
  return Rx.Observable.forkJoin(reqs);
};

export default successRetrieveMoviesCallback;

