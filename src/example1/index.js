import React from 'react';
import { Provider } from 'react-redux';

import createStore from '../store';
import { reducer } from './state';
import { data } from './data';
import Example from './dom/Example';

const store = createStore(reducer);

const Example1 = () => {
  return (
    <Provider store={store}>
      <Example/>
    </Provider>
  );
};

export default Example1;