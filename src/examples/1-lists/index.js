import React from 'react';
import { connect, Provider } from 'react-redux';
import makeReducerAndActions from 'relational-entities-reducer';

import posed, { PoseGroup } from 'react-pose'

import Grid from '@material-ui/core/Grid'
import MuiContainer from '@material-ui/core/Container';
import MuiCard from '@material-ui/core/Card';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiInputField from '@material-ui/core/Input';
import MuiTextField from '@material-ui/core/TextField';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiButton from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';

import StatePresenter from '../../components/StatePresenter';
import schema from './schema';
import { configureStore } from '../store';
import { randomString } from '../util';

const { reducer, actions, selectors } = makeReducerAndActions(schema);

const initialState = {
  list: {
    resources: {
      'l1': { title: 'First list!', itemIds: ['i1'] }
      },
    ids: ['l1']
  },
  item: {
    resources: {
      'i1': {
        listId: 'l1',
        description: 'Edit this text and add some more items!'
      }
    },
    ids: ['i1']
  }
};

export const App = () => {
  const store = configureStore(reducer, initialState);

  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={3} sm={3} md={6}>
          <MuiContainer>
            <Todos/>
          </MuiContainer>
        </Grid>
        <Grid item xs={3} sm={3} md={6}>
          <MuiContainer>
            <State/>
          </MuiContainer>
        </Grid>
      </Grid>
    </Provider>
  );
};

const State = connect(state => ({state}))(StatePresenter);

// Todos is a collection of lists
export const Todos = connect(
  state => ({
    ids: selectors.getIds(state, 'list')
  }),
  dispatch => ({
    addList: () => dispatch(actions.add(
      ['list', randomString(), { itemIds: [randomString()] }]
    ))
  })
)(
  function Todos({ ids = [], addList }) {
    return (
      <MuiContainer maxWidth="sm">
        <PoseGroup exitPose={false}>
          {ids.map((listId, index) => (
            <AnimatedItem key={listId}>
              <List id={listId} index={index} isFirst={index === 0} isLast={index >= ids.length - 1} />
            </AnimatedItem>
          ))}
        </PoseGroup>

        <MuiButton onClick={addList} variant="contained" color="primary">Add a list</MuiButton>
      </MuiContainer>
    );
  }
);

// List is a collection of items
const List = connect(
  (state, { id }) => {
    const list = selectors.getResource(state, ['list', id]);

    if (!list) {
      return {}; // the animation might not be done by the time the state updates
    }

    return { title: list.title, itemIds: list.itemIds }
  },
  (dispatch, { id, index }) => ({
    addItem: () => dispatch(actions.add(['item', randomString(), { listId: id }])),
    remove: () => dispatch(actions.remove([
      'list', id, { removeRelated: { itemIds: {} } }
    ])),
    edit: changes => dispatch(actions.edit(['list', id, changes])),
    moveUp: () => {
      if (index > 0) {
        dispatch(actions.reindex('list', index, index - 1))
      }
    },
    moveDown: () => dispatch(actions.reindex('list', index, index + 1))
  })
)(
  function List({ id, title, itemIds = [], isFirst, isLast, addItem, remove, edit, moveUp, moveDown }) {
    const handleChangeTitle = e => edit({ title: e.target.value });

    return (
      <MuiCard style={{ marginBottom: 20 }}>
        <MuiCardContent>
          <MuiTextField
            value={title}
            onChange={handleChangeTitle}
            placeholder="List title:"
            style={{ fontWeight: 'bold' }}
          />

          <div style={{ display: 'inline-block', float: "right" }}>
            <MuiIconButton size="small" color="primary" onClick={moveUp} disabled={isFirst}><ArrowUpIcon/></MuiIconButton>
            <MuiIconButton size="small" color="primary" onClick={moveDown} disabled={isLast}><ArrowDownIcon/></MuiIconButton>
            <MuiIconButton size="small" color="primary" onClick={remove}><DeleteIcon/></MuiIconButton>
          </div>

          <MuiList>
            {itemIds.map((itemId, index) => (
              <MuiListItem key={itemId} style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Item id={itemId} listId={id} index={index}
                      isFirst={index === 0}
                      isLast={index >= itemIds.length - 1} />
              </MuiListItem>
            ))}
          </MuiList>
          <MuiIconButton style={{ borderRadius: 0 }} onClick={addItem} size="small"><AddIcon/></MuiIconButton>
        </MuiCardContent>
      </MuiCard>
    )
  }
);

const Item = connect(
  (state, { id }) => {
    const item = selectors.getResource(state, ['item', id]);
    return { description: item.description, listId: item.listId }
  },
  (dispatch, { id, index, listId }) => ({
    remove: () => dispatch(actions.remove(['item', id])),
    edit: changes => dispatch(actions.edit(['item', id, changes])),
    moveUp: () => {
      if (index > 0) {
        dispatch(actions.reindexRelated('list', listId, 'itemIds', index, index - 1))
      }
    },
    moveDown: () => dispatch(actions.reindexRelated('list', listId, 'itemIds', index, index + 1))
  })
)(
  function Item({ id, index, description, listId, isFirst, isLast, remove, edit, moveUp, moveDown }) {
    const handleChangeDescription = e => edit({ description: e.target.value });
    const buttonStyle = { borderRadius: 0 };

    return (
      <MuiListItem style={{ padding: 0 }}>
        <MuiInputField
          style={{ paddingRight: 90 }}
          value={description}
          onChange={handleChangeDescription}
          placeholder={`Item #${index + 1} (Item ID: ${id})`}
          fullWidth
        />
        <div style={{ position: 'absolute', right: 0 }}>
          <MuiIconButton size="small" style={buttonStyle} onClick={moveUp} disabled={isFirst}><ArrowUpIcon/></MuiIconButton>
          <MuiIconButton size="small" style={buttonStyle} onClick={moveDown} disabled={isLast}><ArrowDownIcon/></MuiIconButton>
          <MuiIconButton size="small" style={buttonStyle} onClick={remove}><DeleteIcon/></MuiIconButton>
        </div>
      </MuiListItem>
    )
  }
);

const AnimatedItem = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 25 },
      default: { duration: 125 }
    },
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: { duration: 125 }
  }
});

export default App;
