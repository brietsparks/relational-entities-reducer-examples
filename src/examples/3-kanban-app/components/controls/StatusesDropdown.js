import React from 'react';

import Dropdown from './Dropdown';
import * as hooks from '../../hooks';

const StatusesDropdown = ({ label, selectedStatusId, onChange }) => {
  const choices = hooks.useStatusDropdownChoices();

  return (
    <Dropdown
      label={label}
      onChange={onChange}
      choices={choices}
      selectedValue={selectedStatusId}
    />
  );
};

export default StatusesDropdown;
