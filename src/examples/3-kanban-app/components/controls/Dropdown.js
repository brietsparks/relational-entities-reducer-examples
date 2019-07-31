import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import { noop } from '../../util';

const Dropdown = ({ label, choices, selectedValue = '', onChange = noop }) => {
  const handleChange = e => {
    onChange(e.target.value)
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select onChange={handleChange} value={selectedValue} autoWidth>
        {choices.map(({ key, value, label }) => (
        <MenuItem key={key} value={value}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
