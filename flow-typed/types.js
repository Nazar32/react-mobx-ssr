// @flow

declare var module: {
  hot: {
    accept(path: ?string, callback: ?() => void): void,
  },
};

declare var process: {
  env: {
    API_HOST: string,
    HEAD_TITLE: string,
  },
};

// export type EventElement = {
//   id: string,
//   name: { text: string, html: string },
//   description: { text: string, html: string },
//   start: { local: string },
// };

// export type Store = {
//   events: Array<EventElement>,
//   event: EventElement | void,
//   page: number,
//   total: number,
//   numberOfPage: number,
//   elemByPage: number,
//   // getTotal: void,
//   getNumberOfPage: void,
//   loadEvent(id: string): EventElement | Promise<any>,
//   loadEvents(location?: string): Array<EventElement> | Promise<any>,
//   findEvent(id: string): EventElement | Promise<any>,
// };

export type RootStoreType = {
  postStore: PostStoreType, // eslint-disable-line
  headStore: HeadStoreType, // eslint-disable-line
  domainStore: DomaineStoreType, // eslint-disable-line
};

export type DomaineStoreType = {
  path: string,
};

export type PostType = {
  id: number,
  slug: sting,
  title: {
    rendered: string,
  },
  content: {
    rendered: string,
  },
};

export type PostStoreType = {
  rootStore: RootStoreType,
  posts: Array<PostType>,
  post: ?PostType,
  page: number,
  totalPage: number,
  total: number,
  syncPost(slug: string): PostType | Promise<any>,
  syncPosts(): Array<PostType> | Promise<any>,
  findPostInPosts(slug: string): ?PostType,
  findPost(slug: string): PostType | Promise<any>,
};

export type HeadStoreType = {
  rootStore: RootStoreType,
  title: string,
};
