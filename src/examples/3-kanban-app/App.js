import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import { configureStore } from '../store';
import { makeEntitiesData } from './data';
import Page from './components/Page';
import { emptyState, reducer } from './state';

const entities = makeEntitiesData();

const initialState = {
  ...emptyState,
  entities
};

const store = configureStore(reducer, initialState);

function App() {
  return (
    <Provider store={store}>
      <div>
        <CssBaseline/>
        <Page/>
      </div>
    </Provider>
  );
}

export default App;


