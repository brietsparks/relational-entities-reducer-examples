import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import ColorPicker from 'material-ui-color-picker';

import * as hooks from '../hooks';
import { isHexColor } from '../util';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(theme => ({
  newUserButton: {
    padding: '1px 10px',
    marginLeft: 8
  },
  dialogInner: {
    height: 320
  }
}));


const DefaultButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      disableFocusRipple disableRipple
      color="primary" variant="contained"
      className={classes.newUserButton}
    >New User +</Button>
  )
};

const NewUser = ({ OpenButton = DefaultButton }) => {
  const [username, setUsername] = useState('');
  const [avatarBg, setAvatarBg] = useState('');

  const handleChangeUsername = e => setUsername(e.target.value);
  const handleChangeAvatarBg = value => setAvatarBg(value);

  const [isOpen, setIsOpen] = useState(false);
  const newUser = hooks.useAddUser();

  const open = () => {
    setIsOpen(true)
  };

  const close = () => {
    setIsOpen(false);
    setUsername('');
    setAvatarBg('');
  };

  const submit = () => {
    if (username !== '' && isHexColor(avatarBg)) {
      newUser({ username, avatarBg });
      close();
    }
  };

  const classes = useStyles();

  return (
    <span>
      <OpenButton onClick={open} />

      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>New User</DialogTitle>

        <DialogContent>
          <div className={classes.dialogInner}>
            <TextField
              value={username}
              onChange={handleChangeUsername}
              fullWidth label="Username"
            />

            <ColorPicker
              value={avatarBg}
              onChange={handleChangeAvatarBg}
              hintText="Avatar Color"
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={close} color="primary">Cancel</Button>
          <Button onClick={submit} color="primary">Create Task</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default NewUser;
