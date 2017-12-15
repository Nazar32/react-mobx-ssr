const webpack = require('webpack'); //eslint-disable-line
const FlowtypePlugin = require('flowtype-loader/plugin'); //eslint-disable-line
const commonPath = require('./common-paths');

module.exports = {
  devtool: 'eval-source-map',
  entry: ['webpack-hot-middleware/client', commonPath.entry],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      { test: /\.jsx?$/, loader: 'flowtype-loader', enforce: 'pre', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FlowtypePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
