import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../store';
import Posts from './dom/Posts';
import { reducer } from './state';
import { data } from './data';

const initialState = {
  model: data
};
const store = createStore(reducer, initialState);

const Example1 = () => {
  return (
    <Provider store={store}>
      <Posts/>
    </Provider>
  );
};

export default Example1;