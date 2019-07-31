import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import * as hooks from '../hooks';
import Confirm from './Confirm';
import UsersDropdownDialog from './controls/UsersDropdownDialog';
import StatusesDropdownDialog from './controls/StatusesDropdownDialog';
import TextDialog from './controls/TextDialog';
import { DeleteIconButton, CloseIconButton } from './controls';

const useStyles = makeStyles(theme => ({
  taskViewer: {
    background: 'white'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 0
  },
  paragraph: {
    marginTop: 0
  },
  taskHeaderIcons: {
    marginLeft: 'auto'
  }
}));

const TaskViewer = () => {
  const taskId = hooks.useViewedTaskId();
  const statusId = hooks.useTaskStatusId(taskId);
  const statusTitle = hooks.useStatusTitle(statusId);
  const assigneeId = hooks.useTaskAssigneeId(taskId);
  const assigneeUsername = hooks.useUserUsername(assigneeId);
  const assignTask = hooks.useAssignTask(taskId);
  const setStatusId = hooks.useSetTaskStatus(taskId);
  const remove = hooks.useRemoveTask(taskId);
  const title = hooks.useTaskTitle(taskId);
  const description = hooks.useTaskDescription(taskId);
  const editTitle = hooks.useEditTaskTitle(taskId, false);
  const editDescription = hooks.useEditTaskDescription(taskId, false);
  const clearViewedTask = hooks.useViewTask(null);

  const classes = useStyles();

  if (!taskId) {
    return (
      <List>
        <ListItem disableGutters>
          <Typography component="h4" variant="h5">Task Details</Typography>
        </ListItem>
        <ListItem disableGutters>
          <Typography>Click a task card to view details</Typography>
        </ListItem>
      </List>
    );
  }

  return (
    <List>
      <ListItem disableGutters>
        <Typography component="h4" variant="h5">Task Details</Typography>

        <div className={classes.taskHeaderIcons}>
          <Confirm
            onConfirm={remove}
            title="Confirm Delete"
            prompt="Do you want to delete this task?"
          >
          {open => (
            <DeleteIconButton onClick={open} size="small" />
          )}
          </Confirm>

          <CloseIconButton onClick={clearViewedTask} size="small" />
        </div>
      </ListItem>

      <ListItem disableGutters>
        <ListItemText>
          <Label disableGutters>
            Task title:
            <TextDialog
              initialValue={title}
              onSubmit={editTitle}
              title="Edit task title"
            />
          </Label>

          {title}
        </ListItemText>
      </ListItem>

      <ListItem disableGutters>
        <ListItemText>
          <Label>
            Assignee:
            <UsersDropdownDialog
              title="Assign Task To User"
              onSubmit={assignTask}
              selectedUserId={assigneeId}
              withEmpty={false}
            />
          </Label>
          {assigneeUsername}
        </ListItemText>
      </ListItem>

      <ListItem disableGutters>
        <ListItemText>
          <Label>
            Status:
            <StatusesDropdownDialog
              title="Set Task Status"
              onSubmit={setStatusId}
              selectedStatusId={statusId}
            />
          </Label>
          {statusTitle}
        </ListItemText>
      </ListItem>

      <ListItem disableGutters>
        <ListItemText>
          <Label>
            Description:
            <TextDialog
              initialValue={description}
              onSubmit={editDescription}
              title="Edit task description"
              multiline
            />
          </Label>

          <Paragraph>{description}</Paragraph>
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default TaskViewer;

export const Label = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.label}>{children}</span>
};

export const Paragraph = ({ children }) => {
  const classes = useStyles();
  return <p className={classes.paragraph}>{children}</p>
};
