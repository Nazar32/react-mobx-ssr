import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const PageShell = Page =>
  class Shell extends React.Component {
    // call fetch data from page element
    static fetchData(...props) {
      if (Page.fetchData) {
        return Page.fetchData(...props);
      }
      return Promise.resolve();
    }
    render() {
      return (
        <CSSTransitionGroup
          transitionName="route"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
          component="div"
          className="page"
        >
          <Page {...this.props} />
        </CSSTransitionGroup>
      );
    }
  };

export default PageShell;
