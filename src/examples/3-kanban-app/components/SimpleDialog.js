import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { noop } from '../util';

export const DefaultButton = ({ onClick }) => <button onClick={onClick}>Open dialog</button>;

export const SimpleDialog = ({
  children, title, prompt, initialValue,
  onSubmit = noop, OpenButton = DefaultButton, openButtonProps = {}
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (value !== initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const close = () => {
    setOpen(false)
  };

  const handleChange = e => {
    setValue(e)
  };

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleSubmit = () => {
    close();
    onSubmit(value)
  };

  return (
    <span>
      <OpenButton onClick={handleClickOpen} {...openButtonProps} />

      <Dialog open={open} onClose={close} fullWidth={true} maxWidth = "xs">
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          {prompt && <DialogContentText>{prompt}</DialogContentText>}
          {children(value, handleChange)}
        </DialogContent>

        <DialogActions>
          <Button onClick={close} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Done</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

export default SimpleDialog;
