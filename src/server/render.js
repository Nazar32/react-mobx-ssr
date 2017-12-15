import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'mobx-react';
import { toJS } from 'mobx';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import circularJSONStringify from './circular';

// routes
import routes from '../routes/routes';
// style
import { Container } from '../styles/global';
import reset from '../styles/reset';

const sheet = new ServerStyleSheet();

export default (req, store, context = {}) => {
  try {
    const app = ReactDOMServer.renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <StaticRouter location={req.url} context={context}>
          <Provider {...store}>
            <Container>{renderRoutes(routes)}</Container>
          </Provider>
        </StaticRouter>
      </StyleSheetManager>,
    );
    // init inject global
    reset();
    // helmet infos
    const helmet = Helmet.renderStatic();
    // style tags for head
    const styles = sheet.getStyleTags();
    // stringify state from mobx
    const initialState = circularJSONStringify(toJS(store));

    return {
      app,
      helmet,
      styles,
      initialState,
    };
  } catch (e) {
    throw e;
  }
};
