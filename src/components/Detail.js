// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

export class Detail extends Component<{
  postStore: PostStoreType,
  match: {
    params: {
      slug: string
    }
  }
}> {
  static fetchData(store: RootStoreType, params: Object) {
    const slug = params.slug;
    if (slug) {
      try {
        return store.postStore.findPost(slug);
      } catch (error) {
        throw error;
      }
    }
    return false;
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;
    if (slug) {
      try {
        this.props.postStore.findPost(slug);
      } catch (error) {
        throw error;
      }
    }
  }
  render() {
    function createMarkup(content) {
      return { __html: content };
    }
    if (this.props.postStore.post) {
      const content = this.props.postStore.post.content.rendered;
      return (
        <div>
          <h3>{this.props.postStore.post.title.rendered}</h3>
          <div dangerouslySetInnerHTML={createMarkup(content)} />
        </div>
      );
    }
    return <div />;
  }
}

export default inject('postStore')(observer(Detail));
