import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { Button } from 'react-bulma-components';

import FixedScroll from './FixedScroll';
import Post from './Post';
import { getEntityIds, addEntity } from '../state';

const Posts = ({ ids = [], addPost }) => {
  return (
    <FixedScroll title="View">
      {ids.map((id, index) => (
        <Post key={id} id={id} index={index} />
      ))}

      <Button
        onClick={addPost}
        fullwidth={true}
        color="info"
      >New Post</Button>
    </FixedScroll>
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