/* eslint-disable */
import https from 'https';
import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';

// import config from './webpack.config.js';
import render from './src/server/render';
import fetchData from './src/server/fetchData';
import template from './src/server/template';
import RootStore from './src/stores/RootStore';

const store = new RootStore();

const DIST_DIR = 'dist';
const DEFAULT_PORT = process.env.POST || 4000;

const isSSL = process.env.SSL || false;

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || DEFAULT_PORT);
app.use(express.static(path.join(__dirname, DIST_DIR)));

app.get('/*', (req, res, next) => {
  const outputPath = `${DIST_DIR}/template.html`;
  const _template = fs.readFileSync(outputPath);
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

app.listen(app.get('port'), () => {
  console.log(`app listen ${app.get('port')}`); // eslint-disable-line
});
