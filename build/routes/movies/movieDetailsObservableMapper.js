'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var successRetrieveMoviesCallback = function successRetrieveMoviesCallback(allData) {
  var movies = allData.reduce(function (accum, curr, index) {
    var Movies = curr.Movies;

    var mappedMovies = Movies.map(function (movie) {
      return _extends({}, movie, { cinema: _config.cinemas[index] });
    });
    return [].concat(_toConsumableArray(accum), _toConsumableArray(mappedMovies));
  }, []);
  var reqs = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var movie = _step.value;
      var ID = movie.ID,
          cinema = movie.cinema;

      var options = {
        uri: '' + _config.apiUrl + cinema.name + _config.movieDetailEndpoint + ID,
        headers: {
          'x-access-token': _config.accessToken
        },
        json: true
      };
      var cachedMovieDetails = _memoryCache2.default.get(options.uri);
      if (_config.enableMovieDetailsCache && cachedMovieDetails) {
        console.log('return cached movie : ' + cachedMovieDetails.ID); // eslint-disable-line no-console
        reqs.push(_rxjs2.default.Observable.of(cachedMovieDetails));
      } else {
        reqs.push(_rxjs2.default.Observable.defer(function () {
          return (0, _requestPromiseNative2.default)(options).then(function (res) {
            var movieDetails = _extends({}, res, { cinema: cinema });
            _memoryCache2.default.put(options.uri, movieDetails, _config.movieDetailsCacheTimeout);
            return movieDetails;
          });
        }).timeout(_config.requestTimeOut).retryWhen(function (errors) {
          console.log('fetch movie details-' + options.uri + ' fails'); // eslint-disable-line no-console
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
//# sourceMappingURL=movieDetailsObservableMapper.js.map