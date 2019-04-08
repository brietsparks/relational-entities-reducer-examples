import React from 'react';
import { connect } from 'react-redux';
import { Columns, Container, Header } from 'react-bulma-components';

import Posts from './Posts';
import State from './State';


const Example = ({ model }) => {
  return (
    <Container>
      <Columns>
        <Columns.Column>
          <Posts/>
        </Columns.Column>
        <Columns.Column>
          <State/>
        </Columns.Column>
      </Columns>
    </Container>
  );
};

export default connect(
  state => ({ model: state.model })
)(Example);