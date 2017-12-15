// @flow
import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import { observer, inject } from 'mobx-react';

@inject('headStore')
@observer
export class Main extends Component<{
  route: Object,
  headStore: HeadStoreType,
}> {
  render() {
    return (
      <div className="content">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no" />
          <title>{this.props.headStore.title}</title>
        </Helmet>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}
export default Main;
