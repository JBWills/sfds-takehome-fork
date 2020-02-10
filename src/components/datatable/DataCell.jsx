import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import {
  SMALL_BREAKPOINT,
  MEDIUM_BREAKPOINT,
  LARGE_BREAKPOINT,
} from '../../util/jssConstants';

const useStyles = createUseStyles({
  cell: {
    border: '1px solid gray',
    flex: '1 0 0',
    textAlign: 'left',
    overflow: 'hidden',
    wordWrap: 'break-word',
  },

  numericCell: {
    flex: '0.5 0 0',
    textAlign: 'right',
  },

  cellIcon: {
    width: '10px',
    height: '10px',
  },

  headerCell: {
    backgroundColor: 'lightblue',
    cursor: 'pointer',
    textAlign: 'center',
    userSelect: 'none',
  },

  [SMALL_BREAKPOINT]: {
    cell: {
      fontSize: '75%',
      padding: '0px',
    },
  },

  [MEDIUM_BREAKPOINT]: {
    cell: {
      padding: '5px',
    },
  },

  [LARGE_BREAKPOINT]: {
    cell: {
      padding: '10px',
    },
  },
});

const DataCell = ({
  column,
  content,
  imgAltText = null,
  imgSource = null,
  isHeader,
  onClick,
}) => {
  const classes = useStyles();
  return (
    <span
      className={classNames(classes.cell, {
        [classes.headerCell]: isHeader,
        [classes.numericCell]: column.isNumeric,
      })}
      onClick={onClick}
    >
      {content}{' '}
      {imgSource && imgAltText && (
        <img className={classes.cellIcon} alt={imgAltText} src={imgSource} />
      )}
    </span>
  );
};

export default DataCell;
