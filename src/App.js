import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MuiLink from '@material-ui/core/Link';
import MuiButton from '@material-ui/core/button';

import Todos from './examples/1-lists';
import Comments from './examples/2-recursive-tree';

class App extends Component {
  render() {
    const linkStyle = {
      color: 'white',
      textDecoration: 'none',
      margin: '20px',
      fontSize: '16px',
    };

    return (
      <Router>
        <CssBaseline/>

        <AppBar position="absolute">
          <Toolbar>
            <nav>
              <Link to="/list" style={linkStyle}>List</Link>
              <Link to="/tree" style={linkStyle}>Tree</Link>
            </nav>
          </Toolbar>
        </AppBar>

        <div style={{ paddingTop: 100 }}>
          <Route exact path="/" component={Todos} />
          <Route exact path="/list" component={Todos} />
          <Route exact path="/tree" component={Comments} />
        </div>
      </Router>
    );
  }
}

export default App;
