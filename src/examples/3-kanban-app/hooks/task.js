import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors } from '../state';
import {
  useAddResource,
  useEditResourceAttribute, useLinkResource,
  useReadResourceAttribute,
  useRemoveResource, useResourceIds
} from './lib';
import { STATUS, TASK, USER } from '../entities';
import { randomString } from '../util';

export function useTaskIds() {
  return useResourceIds(TASK);
}

export function useViewTask(id) {
  const dispatch = useDispatch();
  const viewedTaskId = useViewedTaskId();
  return () => {
    if (viewedTaskId !== id) {
      dispatch(actions.viewTask(id))
    }
  };
}

export function useViewedTaskId() {
  return useSelector(state => selectors.getViewedTaskId(state));
}

export function useTaskTitle(id) {
  return useReadResourceAttribute(TASK, id, 'title', '');
}

export function useTaskStatusId(id) {
  return useReadResourceAttribute(TASK, id, 'statusId', null);
}

export function useTaskAssigneeId(id) {
  return useReadResourceAttribute(TASK, id, 'assigneeId', null);
}

export function useTaskDescription(id) {
  return useReadResourceAttribute(TASK, id, 'description', '');
}

export function useEditTaskTitle(id, cb) {
  return useEditResourceAttribute(TASK, id, 'title', cb);
}

export function useEditTaskDescription(id, cb) {
  return useEditResourceAttribute(TASK, id, 'description', cb);
}

export function useAddStatusTask() {
  return useAddResource(TASK, randomString());
}

export function useRemoveTask(id) {
  return useRemoveResource(TASK, id);
}

export function useAssignTask(taskId) {
  return useLinkResource(TASK, taskId, USER);
}

export function useSetTaskStatus(taskId) {
  return useLinkResource(TASK, taskId, STATUS);
}
