// @flow
import * as mobx from 'mobx';
import axios from 'axios';

class PostStore {
  @mobx.observable posts: Array<PostType>;
  @mobx.observable post: ?PostType;
  @mobx.observable page: number;
  @mobx.observable total: number;
  @mobx.observable totalPage: number;
  rootStore: RootStoreType;

  constructor(rootStore: RootStoreType, initialState: Object) {
    this.posts = initialState.posts || [];
    this.post = initialState.post || null;
    this.page = initialState.page || 1;
    this.total = initialState.total || 0;
    this.totalPage = initialState.totalPage || 1;

    this.rootStore = rootStore;
  }

  syncPosts(): Array<PostType> | Promise<any> {
    this.rootStore.headStore.title = 'List post';
    return axios(`${this.rootStore.domainStore.path}wp/v2/posts`)
      .then(res => {
        this.total = res.headers ? res.headers['x-wp-total'] : 0;
        this.totalPage = res.headers ? res.headers['x-wp-totalpages'] : 1;
        this.posts = res.data;
      })
      .catch(e => {
        throw e;
      });
  }

  syncPost(slug: string): PostType | Promise<any> {
    return axios(`${this.rootStore.domainStore.path}postlight/v1/post?slug=${slug}`)
      .then(res => {
        this.post = res.data;
      })
      .catch(e => {
        throw e;
      });
  }

  findPostInPosts(slug: string): ?PostType {
    this.posts.find((post: Object) => post.slug === slug);
  }

  findPost(slug: string): PostType | Promise<any> {
    // if same post return
    if (this.post && this.post.slug === slug) {
      return this.post;
    }
    return new Promise(async resolve => {
      this.post = null;
      const post = this.findPostInPosts(slug);
      if (post) {
        this.post = post;
        if (this.post) this.rootStore.headStore.title = this.post.title.rendered;
        return resolve();
      }
      await this.syncPost(slug);
      if (this.post) this.rootStore.headStore.title = this.post.title.rendered;
      return resolve();
    });
  }
}

export default PostStore;
