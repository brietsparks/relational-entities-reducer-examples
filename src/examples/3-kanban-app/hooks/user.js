import {
  useReadResourceAttribute,
  useEditResourceAttribute,
  useResourceIds,
  useEntityResources,
  useAddResource
} from './lib';
import { USER } from '../entities';
import { DEFAULT_AVATAR_BG } from '../constants';
import { randomString } from '../util';

export function useUserUsername(id) {
  return useReadResourceAttribute(USER, id, 'username', '');
}

export function useEditUserUsername(id, cb) {
  return useEditResourceAttribute(USER, id, 'username', cb);
}

export function useUserAvatarBg(id) {
  return useReadResourceAttribute(USER, id, 'avatarBg', DEFAULT_AVATAR_BG);
}

export function useEditUserAvatarBg(id, cb) {
  return useEditResourceAttribute(USER, id, 'avatarBg', cb);
}

export function useUserTasks(id) {
  return useReadResourceAttribute(USER, id, 'taskIds');
}

export function useUserIds() {
  return useResourceIds(USER);
}

export function useUsers() {
  const users = useEntityResources(USER);
  return Object.entries(users).map(([id, user]) => ({ id, ...user }));
}

export function useUserDropdownChoices() {
  const users = useUsers();
  return users.map(({ id, username }) => ({ key: id, value: id, label: username }));
}

export function useAddUser() {
  return useAddResource(USER, randomString());
}
