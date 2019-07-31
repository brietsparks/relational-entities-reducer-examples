import React from 'react';

import * as hooks from '../hooks';
import { getOrdinalData } from '../util';
import TaskCard from './TaskCard';
import { LanesContainer, Lane, Header, Content } from './Lane';
import NewTask from './NewTask';
import { Typography } from '@material-ui/core';

const TasksList = () => {
  const ids = hooks.useFilteredTaskIds();
  const defaultStatusId = hooks.useDefaultStatusId();

  return (
    <LanesContainer>
      <Lane>
        <Header>Tasks <NewTask statusId={defaultStatusId}/></Header>

        <Content>
        {ids.map((id, index) => {
          const { isFirst, isLast } = getOrdinalData(ids, index);

          return (
            <TaskListItem
              key={id}
              index={index}
              id={id}
              isFirst={isFirst}
              isLast={isLast}
            />
          );
        })}
        </Content>
      </Lane>
    </LanesContainer>
  );
};

export const TaskListItem = ({ id, index, isFirst, isLast }) => {
  const statusId = hooks.useTaskStatusId(id);
  const statusTitle = hooks.useStatusTitle(statusId);

  return (
    <TaskCard
      key={id}
      index={index}
      id={id}
      isFirst={isFirst}
      isLast={isLast}
    >
      <Typography>Status: {statusTitle}</Typography>
    </TaskCard>
  );
};

export default TasksList
