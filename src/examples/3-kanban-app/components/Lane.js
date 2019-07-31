import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


export const HeaderOuter = styled.div`
  background: #fff;
  border-bottom: solid 1px #dedede;  
  padding: 0 15px;
  height: 48px;
  
  h4 {
    line-height: 48px;
  }
`;

const useHeaderStyles = makeStyles(theme => ({
  header: {
    padding: '12px 0',
    fontWeight: 'bold',
    textAlign: 'center'
  }
}));

export const Header = ({ children }) => {
  const classes = useHeaderStyles();

  return (
    <HeaderOuter>
      <Typography className={classes.header}>
        {children}
      </Typography>
    </HeaderOuter>
  );
};

export const Content = styled.div`
  list-style: none;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  padding: 15px;
  margin: 0;
  scroll-behavior: smooth;
`;

export const LanesContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const Lane = styled.div`
  flex: 1;
`;

export default {
  Lane,
  LanesContainer,
  Content,
  Header
}
