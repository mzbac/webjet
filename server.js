if (process.env.NODE_ENV !== 'production') {
  require('babel-register')({// eslint-disable-line global-require
    presets: ['es2015-node5', 'stage-0'],
  });
}
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

let routes;
if (process.env.NODE_ENV === 'production') {
  routes = require('./build/index.js').routes;// eslint-disable-line global-require
} else {
  routes = require('./src/server/index.js').routes;// eslint-disable-line global-require
}


module.exports = {
  app() {
    const app = express();
    const router = express.Router();

    let indexPath = path.join(__dirname, 'index.html');
    if (process.env.NODE_ENV === 'production') {
      indexPath = path.join(__dirname, '/public/index.html');
    }
    const publicPath = express.static(path.join(__dirname, 'public'));
    app.use((req, res, next) => {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      next();
    });
    app.use('/public', publicPath);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.get('/', (_, res) => {
      res.sendFile(indexPath);
    });
    app.use('/', routes(router));
    return app;
  },
};
