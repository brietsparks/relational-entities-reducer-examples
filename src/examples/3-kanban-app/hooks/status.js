import {
  useAddResource,
  useEditResourceAttribute, useLinkResources,
  useReadResourceAttribute, useReindexFlatResource, useReindexLinkedResource,
  useRemoveResource,
  useResourceIds,
  useEntityResources
} from './lib';
import { STATUS, TASK } from '../entities';
import { randomString } from '../util';

const emptyArray = [];

export function useStatusIds() {
  return useResourceIds(STATUS);
}

export function useNewStatus() {
  return useAddResource(STATUS);
}

export function useRemoveStatus(id) {
  return useRemoveResource(STATUS, id);
}

export function useStatusTaskIds(id) {
  return useReadResourceAttribute(STATUS, id, 'taskIds', emptyArray);
}

export function useStatusTitle(id) {
  return useReadResourceAttribute(STATUS, id, 'title', '');
}

export function useEditStatusTitle(id) {
  return useEditResourceAttribute(STATUS, id, 'title');
}

export function useMoveStatusUp(index) {
  return useReindexFlatResource(STATUS, index, index - 1);
}

export function useMoveStatusDown(index) {
  return useReindexFlatResource(STATUS, index, index + 1);
}

export function useMoveTaskUp(index, related, linkedId) {
  const moveWithinStatus = useReindexLinkedResource(related, linkedId, TASK, index, index - 1);
  const move = useReindexFlatResource(TASK, index, index - 1);
  return related ? moveWithinStatus : move;
}

export function useMoveTaskDown(index, related, linkedId) {
  const moveWithinStatus = useReindexLinkedResource(related, linkedId, TASK, index, index + 1);
  const move = useReindexFlatResource(TASK, index, index + 1);
  return related ? moveWithinStatus : move;
}

export function useChangeTaskStatus(taskId, statusId) {
  return useLinkResources(STATUS, statusId, TASK, taskId);
}

export function useStatuses() {
  const statuses = useEntityResources(STATUS);
  return Object.entries(statuses).map(([id, status]) => ({ id, ...status }));
}

export function useStatusDropdownChoices() {
  const statuses = useStatuses();
  return statuses.map(({ id, title }) => ({ key: id, value: id, label: title }));
}
