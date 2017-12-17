// @flow
import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import { observer, inject } from 'mobx-react';

export const Main = ({ route, headStore }: { route: Object, headStore: HeadStoreType }) => (
  <div className="content">
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no" />
      <title>{headStore.title}</title>
    </Helmet>
    {renderRoutes(route.routes)}
  </div>
);

export default inject('headStore')(observer(Main));
