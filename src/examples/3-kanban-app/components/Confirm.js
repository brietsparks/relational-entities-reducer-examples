import React, { useState } from 'react';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const Confirm = ({ children, onConfirm, title, prompt }) => {
  const [isOpen, setOpen] = useState(false);

  const open = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    handleClose();
    onConfirm();
  };

  return (
    <span>
      {children(open)}
      <Dialog open={isOpen}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{prompt}</DialogContentText>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogContent>
      </Dialog>
    </span>
  );
};

export default Confirm;
