import { combineReducers } from 'redux';
import { modelSchema } from './schema';
import {
  createReducer,
  createActions,
  selectors
} from 'relational-entities-reducer';

/* ACTIONS */
const modelActions = createActions(modelSchema);
export const addEntity = modelActions.add;
export const removeEntity = modelActions.remove;
export const editEntity = modelActions.edit;
export const reorderEntity = modelActions.reorderEntity;

/* REDUCER */
const modelReducer = createReducer(modelSchema, modelActions);

export const reducer = combineReducers({
  model: modelReducer
});

/* SELECTORS */
export const getEntityIds = (state, { entityType }) => {
  return selectors.getIds(state.model, { entityType });
};

export const getEntity = (state, { entityType, entityId }) => {
  return selectors.getEntity(state.model, { entityType, entityId });
};