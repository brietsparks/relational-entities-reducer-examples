import React from 'react';
import JsonView from 'react-json-view';

const StatePresenter = ({ state, level = 4 }) => {
  return (
    <JsonView
      style={{ padding: 15 }}
      src={state}
      theme="monokai"
      collapsed={level}
      displayObjectSize={false}
    />
  )
};

export default StatePresenter;
