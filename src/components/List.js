// @flow
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Title, Body, Container, Button } from '../styles/post';

export class List extends Component<{
  postStore: PostStoreType
}> {
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
      <Container key={e.id}>
        <Title>{e.title.rendered}</Title>
        <Body dangerouslySetInnerHTML={createMarkup(e.excerpt.rendered)} />
        <Button>
          <Link to={`/post/${e.slug}`}>Read more</Link>
        </Button>
      </Container>
    ));
  }
}

export default inject('postStore')(observer(List));
