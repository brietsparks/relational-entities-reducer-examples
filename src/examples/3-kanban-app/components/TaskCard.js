import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

import { makeStyles } from '@material-ui/core/styles';
import * as hooks from '../hooks';
import UserAvatar from './UserAvatar';
import { UpIconButton, DownIconButton, BackIconButton, ForwardIconButton } from './controls';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    marginBottom: 8,
    cursor: 'pointer'
  }
}));

const TaskCard = ({ children, index, id, related, linkedId, isFirst, isLast, nextStatusId, prevStatusId, showAvatar = true }) => {
  const viewedTaskId = hooks.useViewedTaskId();
  const viewTask = hooks.useViewTask(id);
  const moveUp = hooks.useMoveTaskUp(index, related, linkedId);
  const moveDown = hooks.useMoveTaskDown(index, related, linkedId);
  const moveForward = hooks.useChangeTaskStatus(id, nextStatusId);
  const moveBack = hooks.useChangeTaskStatus(id, prevStatusId);
  const title = hooks.useTaskTitle(id);
  const assigneeId = hooks.useTaskAssigneeId(id);

  const shouldShowActions = (prevStatusId || nextStatusId || !isFirst || !isLast);
  const classes = useStyles();
  const avatar = showAvatar ? <UserAvatar id={assigneeId} /> : null;
  const headerTitle = (
    <div>
      <Typography>{title}</Typography>
      {children}
    </div>
  );

  return (
    <Card className={classes.card} onClick={viewTask}>
      <CardHeader avatar={avatar} title={headerTitle}/>

      {viewedTaskId === id && shouldShowActions &&
        <CardActions disableSpacing>
          <Typography>Move:</Typography>

          {prevStatusId && <BackIconButton onClick={moveBack}/>}
          {!isFirst && <UpIconButton onClick={moveUp}/>}
          {!isLast && <DownIconButton onClick={moveDown}/> }
          {nextStatusId && <ForwardIconButton onClick={moveForward}/> }
        </CardActions>
      }
    </Card>
  );
};

export default TaskCard;
