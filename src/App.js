import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Todos from './examples/1-lists';
import Comments from './examples/2-recursive-tree';

class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline/>
        <Comments/>
      </div>
    );
  }
}

export default App;
