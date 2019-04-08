import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import Post from './Post';
import { getEntityIds, addEntity } from '../state';

const Posts = ({ ids = [], addPost }) => {
  return (
    <div>
      {ids.map((id, index) => (
        <Post key={id} id={id} index={index} />
      ))}

      <button onClick={addPost}>New Post</button>
    </div>
  );
};

const Connected = connect(
  state => ({
    ids: getEntityIds(state, { entityType: 'post' })
  }),
  dispatch => ({
    addPost: () => dispatch(addEntity('post', uuid()))
  })
)(Posts);

export default Connected;