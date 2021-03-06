import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export const configureStore = (reducer, initialState = {}) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware.apply(this, []))
  );
};
