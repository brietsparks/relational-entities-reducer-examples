import React, { useState } from 'react';
import { connect, Provider } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import MuiContainer from '@material-ui/core/Container';
import MuiTextField from '@material-ui/core/TextField';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';

import makeReducerAndActions from 'relational-entities-reducer';

import schema from './schema';
import { configureStore } from '../store';
import { randomString } from '../util';

const { reducer, actions, emptyState, selectors } = makeReducerAndActions(schema);

const initialState = {
  comment: {
    resources: {
      'c1': {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis, sapien quis tempus laoreet, est enim tincidunt mi, et pulvinar orci nulla ac ipsum. Phasellus tempus neque massa, ut tempor felis tempus sed. Sed semper sem quis augue fermentum, id tincidunt ipsum sagittis. Nam ultricies non erat in aliquet. Fusce viverra mi a tellus venenatis, in iaculis ante posuere. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        childIds: ['c2', 'c3']
      },
      'c2': {
        text: 'Duis dapibus sed dui id facilisis. Sed ac ligula non mi fermentum mattis id sit amet urna. Fusce commodo elit libero, a varius justo tincidunt in. Cras ipsum libero, euismod sit amet risus non, placerat sodales lectus. Nunc sit amet arcu in risus posuere ullamcorper. Duis egestas ante a enim molestie, sit amet blandit nisi ultricies. Ut tempor nisi erat, ac tincidunt metus faucibus et. Fusce id commodo mauris, at convallis sem. Phasellus eget eros sodales, pretium ante eget, porta nunc. Pellentesque lacus velit, venenatis nec accumsan eu, facilisis iaculis risus.',
        parentId: 'c1'
      },
      'c3': {
        text: 'Duis nisl magna, commodo non tellus ac, tristique egestas velit. Proin eget eros viverra ex venenatis convallis eu sed orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque vel viverra turpis, egestas fringilla neque. Quisque turpis ipsum, tempus sit amet molestie non, mattis ac massa. Curabitur ut iaculis lorem, quis fermentum libero. Vivamus id felis eu metus faucibus imperdiet et ut ligula.',
        parentId: 'c2'
      }
    },
    ids: ['c1', 'c2', 'c3']
  }
};

export default () => {
  const store = configureStore(reducer, initialState);

  return (
    <Provider store={store}>
      <MuiContainer>
        <RootComments/>
      </MuiContainer>
    </Provider>
  );
};

const Comments = connect(
  null,
  (dispatch, { parentId }) => ({
    addComment: text => dispatch(actions.add(['comment', randomString(), { parentId, text }]))
  })
)(
  ({ ids = [], parentId, addComment }) => {
    const [shouldShowInput, setShouldShowInput] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleChangeNewComment = e => setNewComment(e.target.value);

    const showInput = () => setShouldShowInput(true);

    const handleAddComment = () => {
      if (newComment !== '') {
        addComment(newComment);
        setShouldShowInput(false);
        setNewComment('');
      }
    };

    const style = { marginBottom: 20 };
    const childrenStyle = { paddingLeft: parentId ? 20 : 0 };
    const inputStyle = { width: 300 };
    const linkStyle = { cursor: 'pointer' };
    return (
      <div style={style}>
        <div style={{ marginBottom: 12 }}>
          {shouldShowInput &&
          <div>
            <MuiTextField
              value={newComment}
              onChange={handleChangeNewComment}
              style={inputStyle}
              autoFocus={true}
              multiline
            />
            <br/>
            <MuiLink onClick={handleAddComment} style={linkStyle}>Add Comment</MuiLink>
          </div>
          }

          {!shouldShowInput &&
          <MuiLink onClick={showInput} style={linkStyle}>{parentId ? 'Reply' : 'Post a comment'}</MuiLink>
          }
        </div>

        <div style={childrenStyle}>
          {ids.map(id => {
            return <Comment key={id} id={id} parentId={parentId}/>
          })}
        </div>
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
    return { ...comment };
  },
  (dispatch, { id }) => ({
    remove: () => dispatch(actions.remove([
      'comment', id, { removeRelated: { childIds: commentRemovalSchema } }
    ])),
    edit: change => dispatch(actions.edit(['comment', id, change]))
  })
)(
  ({ id, text, parentId, childIds, remove }) => {
    const style = {
      paddingLeft: 12,
      borderLeft: 'solid 3px #ccc',
      position: 'relative',
      paddingRight: 20,
    };

    return (
      <div style={style}>
        <Typography>
          {text}
          <MuiIconButton onClick={remove} size="small">
            <CloseIcon/>
          </MuiIconButton>
        </Typography>

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
