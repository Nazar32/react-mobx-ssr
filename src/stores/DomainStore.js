// @flow
import * as mobx from 'mobx';

class DomainStore {
  rootStore: RootStoreType;
  @mobx.observable path: string;
  constructor(rootStore: RootStoreType, initialState: Object) {
    this.rootStore = rootStore;
    this.path = initialState.path || process.env.API_HOST;
  }
}

export default DomainStore;
