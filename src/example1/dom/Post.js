import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { getEntity, editEntity, removeEntity, reorderEntity } from '../state';
import Comments from './Comments';

const Post = ({
  id,
  title = '',
  body = '',
  commentIds = [],
  edit,
  remove,
  decrementIndex,
  incrementIndex,
}) => {
  const onChangeTitle = useCallback(e => edit({ title: e.target.value }));
  const onChangeBody = useCallback(e => edit({ body: e.target.value }));

  return (
    <div style={{ border: 'solid 1px' }}>
      <div>
        <button onClick={decrementIndex}>Move Up</button>
        <button onClick={incrementIndex}>Move down</button>
      </div>

      <div>
        <label>Title:</label>
        <input value={title} onChange={onChangeTitle}/>
      </div>

      <div>
        <label>Body:</label>
        <input value={body} onChange={onChangeBody}/>
      </div>

      <button onClick={remove}>Remove</button>

      <hr/>

      <label>Comments:</label>
      <div style={{ marginLeft: 20 }}>
      <Comments ids={commentIds} postId={id}/>
      </div>
    </div>
  );
};

const Connected = connect(
  (state, { id }) => ({
    ...getEntity(state, { entityType: 'post', entityId: id })
  }),
  (dispatch, { id, index }) => ({
    edit: (changes) => dispatch(editEntity('post', id, changes)),
    remove: () => dispatch(removeEntity('post', id, ['comment'])),
    decrementIndex: () => dispatch(reorderEntity('post', index, index - 1)),
    incrementIndex: () => dispatch(reorderEntity('post', index, index + 1))
  })
)(Post);

export default Connected;