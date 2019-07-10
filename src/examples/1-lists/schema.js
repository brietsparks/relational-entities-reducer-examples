export default {
  list: {
    itemIds: {
      has: 'many',
      type: 'item',
    }
  },
  item: {
    listId: {
      has: 'one',
      type: 'list'
    }
  }
}
