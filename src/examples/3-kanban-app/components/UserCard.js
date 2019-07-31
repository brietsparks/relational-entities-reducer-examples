import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import ColorPicker from 'material-ui-color-picker';

import UserAvatar from './UserAvatar';
import * as hooks from '../hooks';
import TaskCard from './TaskCard';
import { getOrdinalData, noop } from '../util';
import { Typography } from '@material-ui/core';
import { USER } from '../entities';
import SimpleDialog from './SimpleDialog';
import TextDialog from './controls/TextDialog';
import { Swatch } from './controls';

const useStyles = makeStyles(theme => ({
  toggleTasks: {
    marginLeft: 10,
    cursor: 'pointer'
  },
}));


const UserCard = ({ id }) => {
  const [isShowingTasks, setIsShowingTasks] = useState(false);

  const username = hooks.useUserUsername(id);
  const avatarBg = hooks.useUserAvatarBg(id);
  const editUsername = hooks.useEditUserUsername(id, false);
  const editAvatarBg = hooks.useEditUserAvatarBg(id, false);
  const taskIds = hooks.useUserTasks(id);
  const avatar = <UserAvatar id={id}/>;
  const showTasks = () => setIsShowingTasks(true);
  const hideTasks = () => setIsShowingTasks(false);

  const classes = useStyles();

  const headerTitle = (
    <div>
      <Typography>
        <ColorPickerDialog color={avatarBg} onSubmit={editAvatarBg} />

        Username:
        <TextDialog
          initialValue={username}
          onSubmit={editUsername}
          title="Edit Username"
        /> {username}
      </Typography>

      <Typography>
        {taskIds && taskIds.length > 0 &&
        <span>
          {taskIds.length} tasks
          <Link
            onClick={isShowingTasks ? hideTasks : showTasks}
            className={classes.toggleTasks}
          >{isShowingTasks ? 'hide' : 'show'}</Link>

        </span>
        }
      </Typography>
    </div>
  );

  return (
    <div>
      <CardHeader avatar={avatar} title={headerTitle} />

      {isShowingTasks &&
      <CardContent>
        {taskIds.map((taskId, index) => {
          const { isFirst, isLast } = getOrdinalData(taskIds, index);

          return (
            <TaskCard
              key={taskId}
              index={index}
              id={taskId}
              related={USER}
              linkedId={id}
              isFirst={isFirst}
              isLast={isLast}
              showAvatar={false}
            />
          )
        })}
      </CardContent>
      }
    </div>
  );
};


export const ColorPickerDialog = ({ color, onSubmit = noop }) => {
  const openButtonProps = { color };

  return (
    <SimpleDialog
      title="Avatar Color"
      OpenButton={Swatch}
      openButtonProps={openButtonProps}
      initialValue={color}
      onSubmit={onSubmit}
    >
      {(value, handleChange) => (
        <div style={{ height: 300 }}>
          <ColorPicker value={value} onChange={handleChange}/>
        </div>
      )}
    </SimpleDialog>
  )
};

export default UserCard;
