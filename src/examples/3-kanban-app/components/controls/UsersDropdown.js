import React from 'react';

import Dropdown from './Dropdown';
import * as hooks from '../../hooks';

const UsersDropdown = ({ label, selectedUserId, onChange, withEmpty = true }) => {
  let choices = hooks.useUserDropdownChoices();

  if (withEmpty) {
    choices = [{ value: null, label: '', key: '' }, ...choices]
  }

  return (
    <Dropdown
      label={label}
      onChange={onChange}
      choices={choices}
      selectedValue={selectedUserId}
    />
  );
};

export default UsersDropdown;
