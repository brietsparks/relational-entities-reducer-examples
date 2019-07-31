import React from 'react';

import { useNewStatus, useStatusIds } from '../hooks';
import { StatusLane } from './StatusLane';
import { getOrdinalData } from '../util';
import { LanesContainer } from './Lane';

export const Board = () => {
  const statusIds = useStatusIds();

  return (
    <LanesContainer>
      {statusIds.map((statusId, index) => {
        const { isFirst, isLast, prev, next } = getOrdinalData(statusIds, index);

        return (
          <StatusLane
            key={statusId}
            index={index}
            id={statusId}
            isFirst={isFirst}
            isLast={isLast}
            prevId={prev}
            nextId={next}
          />
        )
      })}
    </LanesContainer>
  );
};

export default Board;
