// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

interface StaticInterface {
  fetchData(any): Promise<any>;
}

function PageShell(Page: Class<any & StaticInterface>): ComponentType<any> {
  const Shell = (props: any) => (
    <CSSTransitionGroup
      transitionName="route"
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
      component="div"
      className="page"
    >
      <Page {...props} />
    </CSSTransitionGroup>
  );
  Shell.fetchData = (...props) => {
    if (Page.fetchData) {
      return Page.fetchData(...props);
    }
    return Promise.resolve();
  };
  return Shell;
}

export default PageShell;
