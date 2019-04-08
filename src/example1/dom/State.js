import React from 'react';
import { connect } from 'react-redux';

import FixedScroll from './FixedScroll';

const State = ({ state }) => {
  return (
    <FixedScroll title="State">
      <pre>{JSON.stringify({ ...state }, null, 2)}</pre>
    </FixedScroll>
  );
};

export default connect(
  state => ({ state: state.model })
)(State)