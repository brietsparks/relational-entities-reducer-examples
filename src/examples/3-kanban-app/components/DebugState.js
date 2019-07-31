import React from 'react';
import { useStore } from 'react-redux';
import StatePresenter from '../../../components/StatePresenter';

const DebugState = () => {
  const state = useStore().getState();

  return (
    <StatePresenter state={state} />
  );
};

export default DebugState;
