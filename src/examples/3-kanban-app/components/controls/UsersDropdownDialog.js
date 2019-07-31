import React from 'react';

import UsersDropdown from './UsersDropdown';
import SimpleDialog from '../SimpleDialog';
import {EditIconButton} from './icon-buttons';

const UsersDropdownDialog = ({
  title, prompt, label, selectedUserId,
  onSubmit, OpenButton = EditIconButton, withEmpty
}) => {
  return (
    <SimpleDialog
      title={title}
      prompt={prompt}
      onSubmit={onSubmit}
      initialValue={selectedUserId}
      OpenButton={OpenButton}
    >
      {(value, handleChange) => (
        <UsersDropdown
          selectedUserId={value}
          label={label}
          onChange={handleChange}
          withEmpty={withEmpty}
        />
      )}
    </SimpleDialog>
  );
};

export default UsersDropdownDialog;
