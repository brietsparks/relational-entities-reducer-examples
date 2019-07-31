import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from '../state';
import { useTaskIds } from './task';
import { useUserTasks } from './user';

export function useContentView() {
  return useSelector(state => selectors.getContentView(state));
}

export function useSetContentView() {
  const dispatch = useDispatch();
  return (contentView) => dispatch(actions.setContentView(contentView));
}

export function useFilteredByUser() {
  return useSelector(state => selectors.getFilteredByUser(state));
}

export function useFilterByUser() {
  const dispatch = useDispatch();
  return userId => dispatch(actions.filterByUser(userId));
}

export function useFilteredTaskIds() {
  const taskIds = useTaskIds();
  const filteredUserId = useFilteredByUser();
  const filteredTaskIds = useUserTasks(filteredUserId) || [];

  return filteredUserId ? filteredTaskIds : taskIds;
}

export function useDefaultStatusId() {
  return useSelector(state => selectors.getDefaultStatusId(state));
}
