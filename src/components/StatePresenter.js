import React from 'react';

const StatePresenter = ({ state }) => {
  const style = {
    overflowX: 'scroll'
  };

  return (
    <pre style={style}>
      {JSON.stringify(state, null, 2)}
    </pre>
  );
};

export default StatePresenter;
