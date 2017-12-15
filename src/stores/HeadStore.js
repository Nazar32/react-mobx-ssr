// @flow
import * as mobx from 'mobx';

class HeadStore {
  rootStore: RootStoreType;
  @mobx.observable title: string;
  constructor(rootStore: RootStoreType, initialState: Object) {
    this.title = initialState.title || process.env.HEAD_TITLE;
    this.rootStore = rootStore;
  }
}

export default HeadStore;
