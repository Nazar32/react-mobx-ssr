const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // eslint-disable-line
const PreloadWebpackPlugin = require('preload-webpack-plugin'); //eslint-disable-line
const WorkboxPlugin = require('workbox-webpack-plugin'); //eslint-disable-line
const webpack = require('webpack'); //eslint-disable-line
const commonPath = require('./common-paths');
//eslint-disable-line

module.exports = {
  devtool: 'source-map',
  entry: [commonPath.entry],
  module: {
    rules: [],
  },
  plugins: [
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'all',
    }),
    new WorkboxPlugin({
      globDirectory: 'dist',
      globPatterns: ['**/*.js'],
      swDest: path.join('dist', 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('/'),
          handler: 'staleWhileRevalidate',
        },
      ],
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      extractComments: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
