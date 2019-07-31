export const types = {
  VIEW_TASK: 'VIEW_TASK',
  SET_CONTENT_VIEW: 'SET_CONTENT_VIEW',
  FILTER_BY_USER: 'FILTER_BY_USER'
};

export const viewTask = id => ({
  type: types.VIEW_TASK,
  id
});

export const setContentView = contentView => ({
  type: types.SET_CONTENT_VIEW,
  contentView
});

export const filterByUser = userId => ({
  type: types.FILTER_BY_USER,
  userId
});
