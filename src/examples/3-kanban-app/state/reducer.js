import { combineReducers } from 'redux';

import {
  reducer as entitiesReducer,
  actionTypes as entitiesActionTypes
} from '../entities';
import { types } from './actions';
import emptyState from './empty-state';

export const filteredByUser = (
  state = emptyState.filteredByUser,
  { type, userId }
) => {
  switch (type) {
    case types.FILTER_BY_USER:
      return userId;
    default:
      return state
  }
};

export const contentView = (
  state = emptyState.contentView,
  { type, contentView }
) => {
  switch (type) {
    case types.SET_CONTENT_VIEW:
      return contentView;
    default:
      return state
  }
};

export const viewedTaskId = (
  state = emptyState.viewedTaskId,
  { type, id }
) => {
  switch (type) {
    case types.VIEW_TASK:
      return id;
    case entitiesActionTypes.REMOVE:
      return emptyState.viewedTaskId;
    default:
      return state;
  }
};

export default combineReducers({
  filteredByUser,
  contentView,
  viewedTaskId,
  entities: entitiesReducer,
})
