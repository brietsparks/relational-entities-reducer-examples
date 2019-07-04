export const data = {
  post: {
    entities: {
      'p1': {
        title: 'First Post',
        body: 'This is cool',
        commentIds: ['c1', 'c2']
      },
      'p2': {
        title: 'Second Post',
        body: 'Yarg'
      },
      'p3': {
        title: 'Poppin',
        body: 'Wakka wakka'
      }
    },
    ids: ['p1', 'p3', 'p2']
  },
  comment: {
    entities: {
      'c1': { value: 'Foo', postId: 'p1' },
      'c2': { value: 'Bar', postId: 'p1' }
    },
    ids: ['c1', 'c2']
  }
};