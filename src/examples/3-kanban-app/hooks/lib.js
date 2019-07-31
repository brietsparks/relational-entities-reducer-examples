import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../entities';
import { selectors } from '../state';
import { randomString } from '../util';

export function useResourceIds(type) {
  return useSelector(state => selectors.getEntityIds(state, { type }));
}

export function useEntityResources(type) {
  return useSelector(state => selectors.getEntityResources(state, { type }));
}

export function useReadResourceAttribute(type, id, attribute, defaultValue) {
  const resource = useSelector(state => selectors.getResource(state, { type, id }));

  if (!resource) {
    return defaultValue;
  }

  return resource[attribute] || defaultValue;
}

export function useEditResourceAttribute(type, id, field, cb = extractEventTarget) {
  const dispatch = useDispatch();

  return e => {
    const value = (typeof cb === 'function') ? cb(e) : e;
    dispatch(actionCreators.edit([type, id, { [field]: value }]));
  }
}

export function useAddResource(type) {
  const dispatch = useDispatch();

  return useCallback((data) => {
    if (!data.id) {
      data.id = randomString();
    }
    dispatch(actionCreators.add([type, data.id, data]))
  }, [dispatch, type]);
}

export function useRemoveResource(type, id) {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(actionCreators.remove([type, id]));
  }, [dispatch, type, id])
}

export function useReindexFlatResource(type, source, destination) {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(actionCreators.reindex(type, source, destination));
  }, [dispatch, type, source, destination])
}

export function useReindexLinkedResource (type, id, relation, source, destination) {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(actionCreators.reindexRelated(type, id, relation, source, destination))
  }, [dispatch, type, id, relation, source, destination]);
}

export function useLinkResource(type, id, relatedType) {
  const dispatch = useDispatch();

  return useCallback((linkableId, indices = []) => {
    if (linkableId) {
      dispatch(actionCreators.link([type, id, relatedType, linkableId, indices]))
    }
  }, [dispatch, type, id, relatedType]);
}

export function useLinkResources(type1, id1, type2, id2, indices = []) {
  const dispatch = useDispatch();

  return useCallback(() => {
    if (id1 && id2) {
      dispatch(actionCreators.link([type1, id1, type2, id2, indices]))
    }
  }, [dispatch, type1, id1, type2, id2, indices])
}

function extractEventTarget(e) {
  return e.target.value;
}
