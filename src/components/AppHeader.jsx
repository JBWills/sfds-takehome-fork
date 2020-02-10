import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    backgroundColor: 'midnightblue',
    height: '50px',
    width: '100%',
  },

  headerContent: {
    lineHeight: '50px',
    fontSize: 'larger',
    fontWeight: 'bolder',
    color: 'white',
    paddingLeft: '10px',
  },
});

const AppHeader = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div className={classes.headerContent}>
        {'Mayor’s Office of Housing and Community Development'}
      </div>
    </div>
  );
};

export default AppHeader;
