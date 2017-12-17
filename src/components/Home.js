// @flow
import React, { Component } from 'react';
import List from './List';

class Home extends Component<{}> {
  static fetchData(store: RootStoreType) {
    if (store.postStore.total === 0) {
      return store.postStore.syncPosts();
    }
    return false;
  }
  render() {
    return (
      <div>
        <List />
      </div>
    );
  }
}

export default Home;
