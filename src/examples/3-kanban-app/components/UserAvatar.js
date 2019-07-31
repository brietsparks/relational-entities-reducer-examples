import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import * as hooks from '../hooks';
import { DEFAULT_AVATAR_BG } from '../constants';

const UserAvatar = ({ id }) => {
  const bg = hooks.useUserAvatarBg(id) || DEFAULT_AVATAR_BG;
  const username = hooks.useUserUsername(id);
  const letter = (id && username) ? username.charAt(0) : '?';
  const style = { backgroundColor: bg };

  return (
    <Avatar style={style}>{letter}</Avatar>
  );
};

export default UserAvatar;
