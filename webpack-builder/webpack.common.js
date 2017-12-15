const path = require('path');
const webpack = require('webpack'); // eslint-disable-line
const commonPath = require('./common-paths');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //eslint-disable-line
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'); //eslint-disable-line
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  output: {
    filename: 'bundle.js',
    path: commonPath.outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.png/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: `!!html-loader!${path.join(__dirname, '..', 'src', 'template.html')}`,
      filename: 'template.html',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
  ],
};

module.exports = config;
