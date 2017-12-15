import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('postStore')
@observer
export class List extends Component {
  componentDidMount() {
    if (this.props.postStore.total === 0) {
      this.props.postStore.syncPosts();
    }
  }
  render() {
    function createMarkup(content) {
      return { __html: content };
    }
    return this.props.postStore.posts.map(e => (
      <li key={e.id}>
        <b>{e.title.rendered}</b>
        <div dangerouslySetInnerHTML={createMarkup(e.excerpt.rendered)} />
        <Link to={`/post/${e.slug}`}>Read more</Link>
      </li>
    ));
  }
}

export default List;
