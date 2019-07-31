import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import PageViewNav from './PageViewNav';
import FilterByAssignee from './FilterByAssignee';
import TaskViewer from './TaskViewer';
import NewTask from './NewTask';
import * as hooks from '../hooks';

const useStyles = makeStyles(theme => ({
  sidebar: {
    height: '100vh',
    overflowY: 'scroll',
  }
}));

const NewTaskButton = ({ onClick }) => (
  <Button
    onClick={onClick} color="primary" variant="contained"
    disableRipple disableFocusRipple fullWidth
  >New Task</Button>
);

const Sidebar = () => {
  const classes = useStyles();

  const defaultStatusId = hooks.useDefaultStatusId();

  return (
    <div className={classes.sidebar}>
      <PageViewNav/>
      <br/>
      <Container>
        <NewTask statusId={defaultStatusId} OpenButton={NewTaskButton} />
        <br/>
        <FilterByAssignee/>
        <br/>
        <TaskViewer/>
      </Container>
    </div>
  );
};

export default Sidebar;
