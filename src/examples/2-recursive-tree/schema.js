export default {
  'comment': {
    'parentId': {
      has: 'one',
      type: 'comment',
      reciprocalKey: 'childIds'
    },
    'childIds': {
      has: 'many',
      type: 'comment',
      reciprocalKey: 'parentId'
    }
  },
};
