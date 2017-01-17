

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _extends = Object.assign || function (target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const _requestPromiseNative = require('request-promise-native');

const _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

const _rxjs = require('rxjs');

const _rxjs2 = _interopRequireDefault(_rxjs);

const _memoryCache = require('memory-cache');

const _memoryCache2 = _interopRequireDefault(_memoryCache);

const _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

const successRetrieveMoviesCallback = function successRetrieveMoviesCallback(allData) {
  const movies = allData.reduce((accum, curr, index) => {
    const Movies = curr.Movies;

    const mappedMovies = Movies.map((movie) => {
      return _extends({}, movie, { cinema: _config.cinemas[index] });
    });
    return [].concat(_toConsumableArray(accum), _toConsumableArray(mappedMovies));
  }, []);
  const reqs = [];
  let _iteratorNormalCompletion = true;
  let _didIteratorError = false;
  let _iteratorError;

  try {
    const _loop = function _loop() {
      const movie = _step.value;
      let ID = movie.ID,
        cinema = movie.cinema;

      const options = {
        uri: `${_config.apiUrl}${cinema.name}${_config.movieDetailEndpoint}${ID}`,
        headers: {
          'x-access-token': _config.accessToken,
        },
        json: true,
      };
      const cachedMovieDetails = _memoryCache2.default.get(options.uri);
      if (_config.enableMovieDetailsCache && cachedMovieDetails) {
        console.log(`return cached movie : ${cachedMovieDetails.ID}`); // eslint-disable-line no-console
        reqs.push(_rxjs2.default.Observable.of(cachedMovieDetails));
      } else {
        reqs.push(_rxjs2.default.Observable.defer(() => {
          return (0, _requestPromiseNative2.default)(options).then((res) => {
            const movieDetails = _extends({}, res, { cinema });
            _memoryCache2.default.put(options.uri, movieDetails, _config.movieDetailsCacheTimeout);
            return movieDetails;
          });
        }).timeout(_config.requestTimeOut).retryWhen((errors) => {
          console.log(`fetch movie details-${options.uri} fails`); // eslint-disable-line no-console
          return errors.delay(_config.requestDelay);
        }));
      }
    };

    for (var _iterator = movies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

  return _rxjs2.default.Observable.forkJoin(reqs);
};

exports.default = successRetrieveMoviesCallback;
// # sourceMappingURL=movieDetailsObservableMapper.js.map
