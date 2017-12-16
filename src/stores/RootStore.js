// @flow
import HeadStore from './HeadStore';
import PostStore from './PostStore';
import DomainStore from './DomainStore';

class RootStore {
  postStore: PostStoreType;
  headStore: HeadStoreType;
  domainStore: DomaineStoreType;
  constructor(
    initialState: { postStore: {}, headStore: {}, domainStore: {} } = { postStore: {}, headStore: {}, domainStore: {} }
  ) {
    this.postStore = new PostStore(this, initialState.postStore || {});
    this.headStore = new HeadStore(this, initialState.headStore || {});
    this.domainStore = new DomainStore(this, initialState.domainStore || {});
  }
}

export default RootStore;
