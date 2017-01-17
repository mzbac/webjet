'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _rxjs = require('rxjs');

var _rxjs2 = _interopRequireDefault(_rxjs);

var _memoryCache = require('memory-cache');

var _memoryCache2 = _interopRequireDefault(_memoryCache);

var _config = require('../config');

var _movieDetailsObservableMapper = require('./movies/movieDetailsObservableMapper');

var _movieDetailsObservableMapper2 = _interopRequireDefault(_movieDetailsObservableMapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var movies = function movies(req, res) {
  var reqs = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var cinema = _step.value;
      var name = cinema.name;

      var options = {
        uri: '' + _config.apiUrl + name + _config.moviesListEndpoint,
        headers: {
          'x-access-token': _config.accessToken
        },
        json: true
      };
      var cachedMovieList = _memoryCache2.default.get(options.uri);
      if (_config.enableMovieListCache && cachedMovieList) {
        console.log('return cached cachedMovieList : ' + options.uri); // eslint-disable-line no-console
        reqs.push(_rxjs2.default.Observable.of(cachedMovieList));
      } else {
        reqs.push(_rxjs2.default.Observable.defer(function () {
          return (0, _requestPromiseNative2.default)(options).then(function (movieList) {
            _memoryCache2.default.put(options.uri, movieList, _config.movieListCacheTimeout);
            return movieList;
          });
        }).timeout(_config.requestTimeOut).retryWhen(function (errors) {
          console.log('fetch movie list-' + options.uri + ' fails'); // eslint-disable-line no-console
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

  var moviesSource = _rxjs2.default.Observable.forkJoin(reqs);
  var movieDetailsSource = moviesSource.map(_movieDetailsObservableMapper2.default).mergeAll().timeout(_config.globalTimeout);
  var subscribe = movieDetailsSource.subscribe( // eslint-disable-line no-unused-vars
  function (result) {
    res.json(result);
  }, function (err) {
    console.log('fetch movie list error: ' + err); // eslint-disable-line no-console
    res.json({ error: err });
  }, function () {
    console.log('fetch movie list complete!'); // eslint-disable-line no-console
  });
};
exports.default = movies;
//# sourceMappingURL=movies.js.map