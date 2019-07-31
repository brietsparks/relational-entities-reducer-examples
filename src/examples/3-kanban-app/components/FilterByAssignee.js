import React from 'react';

import { UsersDropdown } from './controls';
import * as hooks from '../hooks';

const FilterByAssignee = () => {
  const assigneeId = hooks.useFilteredByUser();
  const filterByAssignee = hooks.useFilterByUser();

  return (
    <div style={{ marginTop: 20 }}>
      <UsersDropdown
        onChange={filterByAssignee}
        selectedUserId={assigneeId}
        label="Filter By Assignee"
        withEmpty={true}
      />
    </div>
  );
};

export default FilterByAssignee;
