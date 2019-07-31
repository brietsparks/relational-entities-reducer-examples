import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import * as hooks from '../hooks';
import { VIEW_BOARD, VIEW_TASKLIST, VIEW_DEBUG, VIEW_USERS } from '../constants';
import Sidebar from './Sidebar';
import Board from './Board';
import TasksList from './TasksList';
import DebugState from './DebugState';
import UsersList from './UsersList';


const useStyles = makeStyles(theme => ({
  viewer: {
    background: '#fff',
    borderRight: 'solid 1px #dedede',
  }
}));

const Page = () => {
  const classes = useStyles();

  const contentView = hooks.useContentView();

  return (
    <Grid container>
      <Grid item sm={3} className={classes.viewer}>
        <Sidebar/>
      </Grid>

      <Grid item sm={9}>
        {contentView === VIEW_BOARD &&
        <Board/>
        }

        {contentView === VIEW_TASKLIST &&
        <TasksList/>
        }

        {contentView === VIEW_USERS &&
        <UsersList/>
        }

        {contentView === VIEW_DEBUG &&
        <DebugState/>
        }
      </Grid>
    </Grid>
  );
};

export default Page;
