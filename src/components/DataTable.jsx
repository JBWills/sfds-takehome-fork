import React from 'react';
import PropTypes from 'prop-types';
import arrowDownIcon from '../resources/arrow-down.png';
import arrowUpIcon from '../resources/arrow-up.png';
import classNames from 'classnames';

const DataCell = ({
  column,
  content,
  imgAltText = null,
  imgSource = null,
  isHeader,
  onClick,
}) => (
  <span
    className={classNames('Cell', {
      HeaderCell: isHeader,
      'Cell-Numeric': column.isNumeric,
    })}
    onClick={onClick}
  >
    {content}{' '}
    {imgSource && imgAltText && (
      <img className="Cell-Icon" alt={imgAltText} src={imgSource} />
    )}
  </span>
);

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

const DataRow = ({ row, columns }) => (
  <div className="TableRow">
    {columns.map((column, i) => (
      <DataCell key={i} column={column} content={column.rowToValue(row)} />
    ))}
  </div>
);

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
      <DataRow key={i} row={row} columns={columns} />
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
