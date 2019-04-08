import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import Comment from './Comment';
import { getEntityIds, addEntity } from '../state';

const Comments = ({ ids = [], addComment }) => {
  return (
    <div>
      {ids.map(id => (
        <Comment id={id} key={id} />
      ))}

      <button onClick={addComment}>New Comment</button>
    </div>
  );
};

const Connected = connect(
  null,
  (dispatch, { postId }) => ({
    addComment: () => dispatch(addEntity('comment', uuid(), { postId }))
  })
)(Comments);

export default Connected;