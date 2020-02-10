import React from 'react';
import PropTypes from 'prop-types';
import arrowDownIcon from '../../resources/arrow-down.png';
import arrowUpIcon from '../../resources/arrow-up.png';
import DataCell from './DataCell';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  tableRow: ({ isHeader, index }) => ({
    display: 'flex',
    width: '100%',
    minWidth: '500px',
    position: isHeader ? 'sticky' : '',
    top: '0px',
    backgroundColor: index % 2 === 1 ? '#EEEEEE' : '#FFFFFF',
  }),
});

const HeaderRow = ({
  columns,
  onClickColumn,
  sortedAscending,
  sortedColumn,
}) => {
  const classes = useStyles({ isHeader: true, index: 0 });
  const sortedIndicatorImageSource = sortedAscending
    ? arrowUpIcon
    : arrowDownIcon;
  const ascendingIndicatorAltText = sortedAscending
    ? 'Sorted ascending'
    : 'Sorted descending';
  return (
    <div className={classes.tableRow}>
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

const DataRow = ({ index, row, columns }) => {
  const classes = useStyles({ isHeader: false, index });
  return (
    <div className={classes.tableRow}>
      {columns.map((column, i) => (
        <DataCell key={i} column={column} content={column.rowToValue(row)} />
      ))}
    </div>
  );
};

DataRow.propTypes = {
  row: PropTypes.object.isRequired,
};

const DataTable = ({
  columns,
  onClickColumn,
  rows,
  sortedAscending,
  sortedColumn,
}) => (
  <div>
    <HeaderRow
      columns={columns}
      onClickColumn={onClickColumn}
      sortedColumn={sortedColumn}
      sortedAscending={sortedAscending}
    />
    {rows.map((row, i) => (
      <DataRow key={i} index={i} row={row} columns={columns} />
    ))}
  </div>
);

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickColumn: PropTypes.func.isRequired,

  // optional props
  sortedAscending: PropTypes.bool,
  sortedColumn: PropTypes.object,
};

DataTable.defaultProps = {
  sortedColumn: null,
  sortedAscending: true,
};

export default DataTable;
