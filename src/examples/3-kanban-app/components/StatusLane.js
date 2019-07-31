import React from 'react';

import * as hooks from '../hooks';

import TaskCard from './TaskCard';
import { Lane, Header, Content } from './Lane';
import { getOrdinalData } from '../util';
import NewTask from './NewTask';
import { STATUS } from '../entities';


export const StatusLane = ({ id, nextId, prevId }) => {
  const title = hooks.useStatusTitle(id);
  const allTaskIds = hooks.useStatusTaskIds(id);
  const filteredIds = hooks.useFilteredTaskIds();

  const taskIds = allTaskIds.filter(taskId => filteredIds.includes(taskId));

  return (
    <Lane>
      <Header>{title} <NewTask statusId={id}/></Header>

      <Content>
        {taskIds.map((taskId, taskIndex) => {
          const { isFirst, isLast } = getOrdinalData(taskIds, taskIndex);

          return (
            <TaskCard
              key={taskId}
              index={taskIndex}
              id={taskId}
              related={STATUS}
              linkedId={id}
              isFirst={isFirst}
              isLast={isLast}
              nextStatusId={nextId}
              prevStatusId={prevId}
            />
          );
        })}
      </Content>
    </Lane>
  );
};

