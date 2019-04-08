import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Heading, Content } from 'react-bulma-components';

import { getEntity, editEntity, removeEntity, reorderEntity } from '../state';
import Comments from './Comments';

const { Field, Label, Control, Input, Textarea } = Form;

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
    <Card>
      <Card.Content>
        <div>
          <button onClick={decrementIndex}>Move Up</button>
          <button onClick={incrementIndex}>Move down</button>
        </div>

        <div>
          <Field>
            <Label>Title</Label>
            <Control>
              <Input
                name="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={onChangeTitle}
              />
            </Control>
          </Field>
        </div>

        <div>
          <Field>
            <Label>Body</Label>
            <Control>
              <Textarea
                name="body"
                placeholder="Body"
                value={body}
                onChange={onChangeBody}
              />
            </Control>
          </Field>
        </div>

        <button onClick={remove}>Remove</button>

        <hr/>

        <label>Comments:</label>
        <div style={{ marginLeft: 20 }}>
          <Comments ids={commentIds} postId={id}/>
        </div>
      </Card.Content>
    </Card>
  );
};

const Connected = connect(
  (state, { id }) => ({
    ...getEntity(state, { entityType: 'post', entityId: id })
  }),
  (dispatch, { id, index }) => ({
    edit: (changes) => dispatch(editEntity('post', id, changes)),
    remove: () => dispatch(removeEntity('post', id, ['comment'])),
    decrementIndex: () => {
      if (index > 0) {
        dispatch(reorderEntity('post', index, index - 1))
      }
    },
    incrementIndex: () => dispatch(reorderEntity('post', index, index + 1))
  })
)(Post);

export default Connected;