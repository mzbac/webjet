const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const atImport = require('postcss-import');
const cssnext = require('postcss-cssnext');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client/index',
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle-[hash].js',
    publicPath: 'public',
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('bundle-[hash].css'),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
      },
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
    return [atImport(), cssnext({ browsers: ['last 2 versions', 'Chrome >= 42', 'Firefox >= 38', 'iOS >= 7', 'Android >= 4'] })];
  },
};
