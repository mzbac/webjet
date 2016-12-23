import rp from 'request-promise-native';
import Rx from 'rxjs';
import {
  apiUrl,
  cinemas,
  moviesListEndpoint,
  accessToken,
  requestDelay,
  requestTimeOut,
  globalTimeout,
} from '../config';
import movieDetailsObservableMapper from './movies/movieDetailsObservableMapper';

const movies = (req, res) => {
  const reqs = [];
  for (const cinema of cinemas) {
    const { name } = cinema;
    const options = {
      uri: `${apiUrl}${name}${moviesListEndpoint}`,
      headers: {
        'x-access-token': accessToken,
      },
      json: true,
    };
    reqs.push(Rx.Observable.defer(() => rp(options))
      .timeout(requestTimeOut)
      .retryWhen((errors) => {
        console.log(`fetch movie list-${options.uri} fails`);// eslint-disable-line no-console
        return errors.delay(requestDelay);
      })
    );
  }
  const moviesSource = Rx.Observable.forkJoin(reqs);
  const movieDetailsSource = moviesSource
    .map(movieDetailsObservableMapper)
    .mergeAll()
    .timeout(globalTimeout);
  const subscribe = movieDetailsSource.subscribe(// eslint-disable-line no-unused-vars
    (result) => {
      res.json(result);
    },
    (err) => {
      console.log(`fetch movie list error: ${err}`);// eslint-disable-line no-console
      res.json({ error: err });
    },
    () => {
      console.log('fetch movie list complete!');// eslint-disable-line no-console
    });
};
export default movies;
