const Server = require('./server.js');

const port = (process.env.PORT || 8080);
const app = Server.app();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');// eslint-disable-line
  const webpackDevMiddleware = require('webpack-dev-middleware');// eslint-disable-line
  const webpackHotMiddleware = require('webpack-hot-middleware');// eslint-disable-line
  const config = require('./webpack.dev.config.js');// eslint-disable-line
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
}

app.listen(port);
console.log(`Listening at http://localhost:${port}`);// eslint-disable-line