import entities from 'relational-entities-reducer';

export const USER = 'user';
export const TASK = 'task';
export const STATUS = 'status';
export const TAG = 'tag';
export const COMMENT = 'comment';

export const schema = {
  [USER]: {
    taskIds: {
      has: 'many',
      type: TASK
    },
    commentIds: {
      has: 'many',
      type: COMMENT
    }
  },
  [STATUS]: {
    taskIds: {
      has: 'many',
      type: TASK
    },
  },
  [TASK]: {
    assigneeId: {
      has: 'one',
      type: USER
    },
    statusId: {
      has: 'one',
      type: STATUS
    },
    tagIds: {
      has: 'many',
      type: TAG
    },
    commentIds: {
      has: 'many',
      type: COMMENT
    }
  },
  [TAG]: {
    taskIds: {
      has: 'many',
      type: TASK
    }
  },
  [COMMENT]: {
    userId: {
      has: 'one',
      type: USER,
    },
    taskId: {
      has: 'one',
      type: TASK
    },
    parentId: {
      has: 'one',
      type: COMMENT,
      reciprocalKey: 'childIds'
    },
    childIds: {
      has: 'many',
      type: COMMENT,
      reciprocalKey: 'parentId'
    }
  }
};

export const {
  actionCreators,
  actionTypes,
  reducer,
  selectors,
  emptyState,
} = entities(schema);
