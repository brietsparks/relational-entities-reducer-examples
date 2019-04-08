import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Heading, Content } from 'react-bulma-components';

import { getEntity, editEntity, removeEntity, reorderEntity } from '../state';
import Comments from './Comments';
import { MoveUp, MoveDown, Remove } from './Icons';

const { Field, Label, Control, Input, Textarea } = Form;

const Post = ({
  id,
  index,
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
          <MoveUp onClick={decrementIndex}/>
          <MoveDown onClick={incrementIndex}/>
          <Remove
            onClick={remove}
            style={{
              position: 'absolute',
              right: 0,
              marginRight: 20
            }}
          />
        </div>

        <div>
          <Field>
            <Label>Title</Label>
            <Control>
              <Input
                type="text"
                placeholder={`Title (${id})`}
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