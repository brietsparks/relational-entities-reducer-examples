import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import CodeIcon from '@material-ui/icons/Code';
import UserIcon from '@material-ui/icons/Person';

import { VIEW_BOARD, VIEW_TASKLIST, VIEW_DEBUG, VIEW_USERS } from '../constants';
import * as hooks from '../hooks';

const useStyles = makeStyles(theme => ({
  tab: {
    minWidth: 80,
    width: 80,
  }
}));

const PageViewNav = () => {
  const contentView = hooks.useContentView();
  const setContentView = hooks.useSetContentView();

  const viewBoard = () => {
    if (contentView !== VIEW_BOARD) {
      setContentView(VIEW_BOARD);
    }
  };
  const viewList = () => {
    if (contentView !== VIEW_TASKLIST) {
      setContentView(VIEW_TASKLIST);
    }
  };
  const viewUsers = () => {
    if (contentView !== VIEW_USERS) {
      setContentView(VIEW_USERS);
    }
  };
  const viewDebug = () => {
    if (contentView !== VIEW_DEBUG) {
      setContentView(VIEW_DEBUG);
    }
  };

  const classes = useStyles();

  return (
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      value={contentView}
    >
      <Tab
        classes={{ root: classes.tab }}
        style={{ maxWidth: 40 }}
        label="Kanban"
        icon={<ViewColumnIcon/>}
        value={VIEW_BOARD}
        onClick={viewBoard}
        disableRipple disableFocusRipple
      />
      <Tab
        classes={{ root: classes.tab }}
        label="Tasks"
        icon={<ViewListIcon/>}
        value={VIEW_TASKLIST}
        onClick={viewList}
        disableRipple disableFocusRipple
      />
      <Tab
        classes={{ root: classes.tab }}
        label="Users"
        icon={<UserIcon/>}
        value={VIEW_USERS}
        onClick={viewUsers}
        disableRipple disableFocusRipple
      />
      <Tab
        classes={{ root: classes.tab }}
        label="Debug"
        icon={<CodeIcon/>}
        value={VIEW_DEBUG}
        onClick={viewDebug}
        disableRipple disableFocusRipple
      />
    </Tabs>
  );
};

export default PageViewNav;
