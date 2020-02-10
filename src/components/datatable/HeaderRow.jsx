import React from 'react';
import arrowDownIcon from '../../resources/arrow-down.png';
import arrowUpIcon from '../../resources/arrow-up.png';
import DataCell from './DataCell';
import { createUseStyles } from 'react-jss';

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

const HeaderRow = ({
  columns,
  onClickColumn,
  sortedAscending,
  sortedColumn,
}) => {
  const sortedIndicatorImageSource = sortedAscending
    ? arrowUpIcon
    : arrowDownIcon;
  const ascendingIndicatorAltText = sortedAscending
    ? 'Sorted ascending'
    : 'Sorted descending';
  return (
    <div className="TableRow">
      {columns.map((column, i) => (
        <DataCell
          column={column}
          content={column.phrase}
          isHeader
          imgSource={
            sortedColumn === column ? sortedIndicatorImageSource : null
          }
          imgAltText={ascendingIndicatorAltText}
          key={i}
          onClick={() => onClickColumn(column)}
        />
      ))}
    </div>
  );
};
