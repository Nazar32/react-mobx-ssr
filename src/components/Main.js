// @flow
import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import { observer, inject } from 'mobx-react';
import CatchError from './CatchError';

type Props = { route: Object, headStore: HeadStoreType };

export class Main extends Component<
  Props,
  {
    error: ?Error,
    errorInfo: ?string
  }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }
  componentDidCatch(error: Error, errorInfo: string) {
    this.setState({
      error,
      errorInfo
    });
  }
  render() {
    if (this.state.error) return <CatchError />;
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

export default inject('headStore')(observer(Main));
