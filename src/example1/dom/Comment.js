import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { getEntity, editEntity, removeEntity } from '../state';

const Comment = ({ id, body = '', edit, remove }) => {
  const onChangeBody = useCallback(e => edit({ body: e.target.value }));

  return (
    <div>
      <input value={body} onChange={onChangeBody} />
      <button onClick={remove}>Remove</button>
    </div>
  );
};

const Connected = connect(
  (state, { id }) => ({
    ...getEntity(state, { entityType: 'comment', entityId: id })
  }),
  (dispatch, { id }) => ({
    edit: (changes) => dispatch(editEntity('comment', id, changes)),
    remove: () => dispatch(removeEntity('comment', id))
  })
)(Comment);

export default Connected;