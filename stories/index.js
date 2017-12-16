import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import StoryRouter from 'storybook-router';

import { List } from '../src/components/List';

const postStore = {
  posts: [
    {
      title: {
        rendered: 'Hello World'
      },
      excerpt: {
        rendered:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere luctus nunc, a maximus odio finibus eget. Donec commodo leo sit amet dolor vulputate ultricies. Phasellus et pretium erat, interdum euismod lorem. Fusce facilisis neque turpis, ut mollis lacus egestas eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse potenti. […]'
      },
      slug: 'hello-world'
    }
  ]
};

storiesOf('List', module)
  .addDecorator(StoryRouter())
  .add('Post element', () => <List postStore={postStore} />);

// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
