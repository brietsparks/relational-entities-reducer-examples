import React, { useState } from 'react';
import { connect, Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import MuiContainer from '@material-ui/core/Container';
import MuiTextField from '@material-ui/core/TextField';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiLink from '@material-ui/core/Link';
import CloseIcon from '@material-ui/icons/Close';

import makeReducerAndActions from 'relational-entities-reducer';

import StatePresenter from '../../components/StatePresenter';

import schema from './schema';
import { configureStore } from '../store';
import { randomString } from '../util';

const { reducer, actions, emptyState, selectors } = makeReducerAndActions(schema);

const initialState = {
  comment: {
    resources: {
      'c1': {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis, sapien quis tempus laoreet, est enim tincidunt mi, et pulvinar orci nulla ac ipsum. Phasellus tempus neque massa, ut tempor felis tempus sed.',
        childIds: ['c2', 'c3']
      },
      'c2': {
        text: 'Duis dapibus sed dui id facilisis. Sed ac ligula non mi fermentum mattis id sit amet urna. Fusce commodo elit libero, a varius justo tincidunt in. Cras ipsum libero, euismod sit amet risus non, placerat sodales lectus.',
        parentId: 'c1'
      },
      'c3': {
        text: 'Duis nisl magna, commodo non tellus ac, tristique egestas velit. Proin eget eros viverra ex venenatis convallis eu sed orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        parentId: 'c1'
      }
    },
    ids: ['c1', 'c2', 'c3']
  }
};

export default () => {
  const store = configureStore(reducer, initialState);

  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <MuiContainer>
            <RootComments/>
          </MuiContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <MuiContainer>
            <State/>
          </MuiContainer>
        </Grid>
      </Grid>
    </Provider>
  );
};

const State = connect(state => ({state}))(StatePresenter);

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
      if (newComment.trim() !== '') {
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
            <MuiLink onClick={handleAddComment} style={linkStyle}>Submit</MuiLink>
            <br/>
            <MuiTextField
              value={newComment}
              onChange={handleChangeNewComment}
              style={inputStyle}
              autoFocus={true}
              multiline
            />
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
