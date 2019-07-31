import React from 'react';

import StatusesDropdown from './StatusesDropdown';
import SimpleDialog from '../SimpleDialog';
import {EditIconButton} from './icon-buttons';

const StatusesDropdownDialog = ({
  title, prompt, onSubmit, selectedStatusId,
  label, OpenButton = EditIconButton
}) => {
  return (
    <SimpleDialog
      title={title}
      prompt={prompt}
      onSubmit={onSubmit}
      initialValue={selectedStatusId}
      OpenButton={OpenButton}
    >
      {(value, handleChange) => (
        <StatusesDropdown
          selectedStatusId={value}
          label={label}
          onChange={handleChange}
        />
      )}
    </SimpleDialog>
  );
};

export default StatusesDropdownDialog;
