import React from 'react';
import { Provider, connect } from 'react-redux';
import makeReducerAndActions from 'relational-entities-reducer';

import schema from './schema';
import { configureStore } from '../store';
import { randomString } from '../util';

const { reducer, actions, emptyState, selectors } = makeReducerAndActions(schema);

export default () => {
  const store = configureStore(reducer, emptyState);

  return (
    <Provider store={store}>
      <RootComments/>
    </Provider>
  );
};

const Comments = connect(
  null,
  (dispatch, { parentId }) => ({
    addComment: () => dispatch(actions.add(['comment', randomString(), { parentId }]))
  })
)(
  ({ ids = [], parentId, addComment }) => {
    const style = { paddingLeft: parentId ? 20 : 0 };
    return (
      <div style={style}>
        {ids.map(id => {
          return <Comment id={id} parentId={parentId}/>
        })}

        <button onClick={addComment}>Add Comment</button>
      </div>
    );
  }
);

const commentRemovalSchema = () => ({
  childIds: commentRemovalSchema
});

const Comment = connect(
  (state, { id }) => {
    const comment = selectors.getResource(state, ['comment', id]);
    return {...comment};
  },
  (dispatch, { id }) => ({
    remove: () => dispatch(actions.remove([
      'comment',
      id,
      { removeRelated: { childIds: commentRemovalSchema } }
    ])),
    edit: change => dispatch(actions.edit(['comment', id, change]))
  })
)(
  ({ id, text, parentId, childIds, remove, edit }) => {
    const style = { border: 'solid 1px' };

    const handleChangeText = e => edit({ text: e.target.value });

    return (
      <div style={style}>
        <input value={text} onChange={handleChangeText} />
        <button onClick={remove}>Remove</button>

        <Comments ids={childIds} parentId={id}/>
      </div>
    );
  }
);

const getRootCommentIds = state => {
  const ids = selectors.getIds(state, 'comment');
  return ids.filter(id => {
    const comment = selectors.getResource(state, ['comment', id]);
    return !comment.parentId;
  })
};

const RootComments = connect(
  state => ({
    ids: getRootCommentIds(state)
  })
)(Comments);
