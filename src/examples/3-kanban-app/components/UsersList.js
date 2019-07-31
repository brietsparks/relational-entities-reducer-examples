import React from 'react';

import * as hooks from '../hooks';
import { LanesContainer, Lane, Header, Content } from './Lane';
import { getOrdinalData } from '../util';
import UserCard from './UserCard';
import NewUser from './NewUser';

const UsersList = () => {
  const ids = hooks.useUserIds();

  return (
    <LanesContainer>
      <Lane>
        <Header>Users <NewUser/></Header>

        <Content>
          {ids.map((id, index) => {
            const { isFirst, isLast } = getOrdinalData(ids, index);

            return (
              <UserCard
                key={id}
                index={index}
                id={id}
                isFirst={isFirst}
                isLast={isLast}
              />
            )
          })}
        </Content>
      </Lane>
    </LanesContainer>
  );
};

export default UsersList;
