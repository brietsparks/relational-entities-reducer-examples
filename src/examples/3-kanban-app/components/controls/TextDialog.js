import React from 'react';
import MuiTextField from '@material-ui/core/TextField';

import SimpleDialog from '../SimpleDialog';
import {EditIconButton} from './icon-buttons';

const TextDialog = ({
  title, prompt, onSubmit, initialValue,
  OpenButton = EditIconButton, label, multiline
}) => {
  return (
    <SimpleDialog
      title={title}
      prompt={prompt}
      onSubmit={onSubmit}
      initialValue={initialValue}
      OpenButton={OpenButton}
    >
      {(value, handleChange) => (
        <TextField
          autoFocus
          label={label}
          value={value}
          onChange={handleChange}
          multiline={multiline}
        />
      )}
    </SimpleDialog>
  );
};

export const TextField = ({ label, value, onChange, ...props }) => {
  const handleChange = e => onChange(e.target.value);

  return (
    <MuiTextField
      fullWidth
      margin="dense"
      label={label}
      value={value}
      onChange={handleChange}
      {...props}
    />
  )
};

export default TextDialog;
