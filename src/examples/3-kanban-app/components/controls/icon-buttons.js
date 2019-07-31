import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

export const AddIconButton = ({ onClick }) => {
  const style = { top: -2 };

  return (
    <IconButton size="small" onClick={onClick} style={style}>
      <AddIcon color="primary" fontSize="inherit" />
    </IconButton>
  )
};


export const EditIconButton = ({ onClick }) => {
  const style = { top: -2 };
  return (
    <IconButton size="small" onClick={onClick} style={style}>
      <EditIcon color="primary" fontSize="inherit" />
    </IconButton>
  );
};

export const UpIconButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} size="small">
      <ArrowUpIcon color="primary" fontSize="inherit" />
    </IconButton>
  );
};

export const DownIconButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} size="small">
      <ArrowDownIcon color="primary" fontSize="inherit" />
    </IconButton>
  );
};

export const ForwardIconButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} size="small">
      <ArrowForwardIcon color="primary" fontSize="inherit" />
    </IconButton>
  );
};

export const BackIconButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} size="small">
      <ArrowBackIcon color="primary" fontSize="inherit" />
    </IconButton>
  );
};

export const DeleteIconButton = ({ onClick, size }) => {
  return (
    <IconButton onClick={onClick} size={size}>
      <DeleteIcon onClick={onClick} color="secondary" />
    </IconButton>
  )
};

export const CloseIconButton = ({ onClick, size }) => {
  return (
    <IconButton onClick={onClick} size={size}>
      <CloseIcon onClick={onClick} />
    </IconButton>
  )
};
