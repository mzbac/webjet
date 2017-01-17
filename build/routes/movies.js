

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _requestPromiseNative = require('request-promise-native');

const _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

const _rxjs = require('rxjs');

const _rxjs2 = _interopRequireDefault(_rxjs);

const _memoryCache = require('memory-cache');

const _memoryCache2 = _interopRequireDefault(_memoryCache);

const _config = require('../config');

const _movieDetailsObservableMapper = require('./movies/movieDetailsObservableMapper');

const _movieDetailsObservableMapper2 = _interopRequireDefault(_movieDetailsObservableMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const movies = function movies(req, res) {
  const reqs = [];
  let _iteratorNormalCompletion = true;
  let _didIteratorError = false;
  let _iteratorError;

  try {
    const _loop = function _loop() {
      const cinema = _step.value;
      const name = cinema.name;

      const options = {
        uri: `${_config.apiUrl}${name}${_config.moviesListEndpoint}`,
        headers: {
          'x-access-token': _config.accessToken,
        },
        json: true,
      };
      const cachedMovieList = _memoryCache2.default.get(options.uri);
      if (_config.enableMovieListCache && cachedMovieList) {
        console.log(`return cached cachedMovieList : ${options.uri}`); // eslint-disable-line no-console
        reqs.push(_rxjs2.default.Observable.of(cachedMovieList));
      } else {
        reqs.push(_rxjs2.default.Observable.defer(() => {
          return (0, _requestPromiseNative2.default)(options).then((movieList) => {
            _memoryCache2.default.put(options.uri, movieList, _config.movieListCacheTimeout);
            return movieList;
          });
        }).timeout(_config.requestTimeOut).retryWhen((errors) => {
          console.log(`fetch movie list-${options.uri} fails`); // eslint-disable-line no-console
          return errors.delay(_config.requestDelay);
        }));
      }
    };

    for (var _iterator = _config.cinemas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  const moviesSource = _rxjs2.default.Observable.forkJoin(reqs);
  const movieDetailsSource = moviesSource.map(_movieDetailsObservableMapper2.default).mergeAll().timeout(_config.globalTimeout);
  const subscribe = movieDetailsSource.subscribe( // eslint-disable-line no-unused-vars
  (result) => {
    res.json(result);
  }, (err) => {
    console.log(`fetch movie list error: ${err}`); // eslint-disable-line no-console
    res.json({ error: err });
  }, () => {
    console.log('fetch movie list complete!'); // eslint-disable-line no-console
  });
};
exports.default = movies;
// # sourceMappingURL=movies.js.map
