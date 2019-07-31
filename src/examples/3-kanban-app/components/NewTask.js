import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UsersDropdown from './controls/UsersDropdown';
import { AddIconButton } from './controls';

import * as hooks from '../hooks';

const NewTask = ({ statusId, OpenButton = AddIconButton }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState(undefined);

  const handleChangeTitle = e => setTitle(e.target.value);
  const handleChangeDescription = e => setDescription(e.target.value);
  const handleChangeAssigneeId = val => setAssigneeId(val);

  const [isOpen, setIsOpen] = useState(false);
  const newTask = hooks.useAddStatusTask();

  const open = () => {
    setIsOpen(true)
  };

  const close = () => {
    setIsOpen(false);
    setTitle('');
    setDescription('');
    setAssigneeId('');
  };

  const submit = () => {
    if (title !== '') {
      const task = { statusId, title, description };

      if (assigneeId) {
        task.assigneeId = assigneeId;
      }

      newTask(task);
      close();
    }
  };

  return (
    <span>
      <OpenButton onClick={open} />

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>New Task</DialogTitle>

        <DialogContent>
          <TextField
            value={title} onChange={handleChangeTitle}
            autoFocus fullWidth label="Title"
          />

          <TextField
            value={description} onChange={handleChangeDescription}
            fullWidth label="Description"
          />

          <UsersDropdown
            selectedUserId={assigneeId} onChange={handleChangeAssigneeId}
            label="Assignee"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={close} color="primary">Cancel</Button>
          <Button onClick={submit} color="primary">Create Task</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default NewTask;
