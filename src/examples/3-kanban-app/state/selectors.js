import { selectors as entities, STATUS } from '../entities';

export const getEntityIds = (state, { type }) => entities.getEntityIds(state.entities, { type });
export const getEntityResources = (state, { type }) => entities.getEntityResources(state.entities, { type });
export const getResource = (state, { type, id }) => entities.getResource(state.entities, { type, id });

export const getViewedTaskId = state => state.viewedTaskId;
export const getContentView = state => state.contentView;
export const getFilteredByUser = state => state.filteredByUser;

export const getDefaultStatusId = state => {
  const resources = getEntityResources(state, { type: STATUS });
  return Object.keys(resources).find(id => resources[id].isDefaultStatus);
};
