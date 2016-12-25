const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const atImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    './src/client/index',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css'),
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader'),
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.png$/,
        loader: 'file',
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file',
      },
    ],
  },
  postcss: () => {
    return [atImport(), cssnext()];
  },
};
