/* eslint-disable */
import https from 'https';
import path from 'path';
import fs from 'fs';
import MemoryFileSystem from 'memory-fs';

import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';

import devcert from 'devcert-with-localhost'; //eslint-disable-line

import webpack from 'webpack'; //eslint-disable-line
import webpackDevMiddleware from 'webpack-dev-middleware'; //eslint-disable-line
import webpackHotMiddleware from 'webpack-hot-middleware'; //eslint-disable-line

import config from './webpack.config.js';
import render from './src/server/render';
import fetchData from './src/server/fetchData';
import template from './src/server/template';
import RootStore from './src/stores/RootStore';

const store = new RootStore();

const DIST_DIR = 'dist';
const DEFAULT_PORT = process.env.POST || 4000;

const isSSL = process.env.SSL || false;
const _config = config();
const compiler = webpack(_config);
const memFs = (compiler.outputFileSystem = new MemoryFileSystem());

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || DEFAULT_PORT);
app.use(express.static(path.join(__dirname, DIST_DIR)));
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: _config.output.publicPath,
  }),
);
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res, next) => {
  // get template in webpack compiler
  const outputPath = `${compiler.options.output.path}/template.html`;
  const packedOutput = memFs.readFileSync(outputPath);
  const _template = packedOutput.toString();
  // fetch initial data from app
  return fetchData(req, store).then(data => {
    // render app
    const renderApp = render(req, store);
    // render html
    const html = template(renderApp, _template);

    res.set('content-type', 'text/html');
    res.send(html);
    res.end();
  });
});

if (isSSL === true) {
  devcert('my-app', { installCertutil: true }).then(ssl => {
    https.createServer(ssl, app).listen(app.get('port'));
    console.log(`app listen ${app.get('port')}`); // eslint-disable-line
  });
} else {
  app.listen(app.get('port'));
}
