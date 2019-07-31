import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Todos from './examples/1-lists';
import Comments from './examples/2-recursive-tree';
import KanbanApp from './examples/3-kanban-app';
import AppBar from './AppBar';

const App = () => {

  return (
    <Router basename="relational-entities-reducer-examples">
      <CssBaseline/>

      <AppBar />

      <div style={{ paddingTop: 65 }}>
        <Route exact path="/" component={Todos} />
        <Route exact path="/list" component={Todos} />
        <Route exact path="/tree" component={Comments} />
        <Route exact path="/kanban-app" component={KanbanApp} />
      </div>
    </Router>
  );
};

export default App;
