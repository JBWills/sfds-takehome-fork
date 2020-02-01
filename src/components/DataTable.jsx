import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrowDownIcon from '../resources/arrow-down.png';
import arrowUpIcon from '../resources/arrow-up.png';
import classNames from 'classnames';

const DataCell = ({ column, content, isHeader, onClick, imgSource=null }) => {
  return (
    <span
      className={classNames('Cell', { Header: isHeader, 'Cell-Numeric': column.isNumeric })}
      onClick={onClick}
    >
      {content}
      {' '}
      {imgSource && <img className="Cell-Icon" src={imgSource} />}
    </span>
  );
};

const HeaderRow = ({ columns, onClickColumn, sortedColumn, sortedAscending }) => {
  const sortedIndicatorImageSource = sortedAscending ? arrowUpIcon : arrowDownIcon;
  return (
    <div className="TableRow">
      {columns.map((column, i) => (
        <DataCell
          column={column}
          content={column.phrase}
          isHeader
          imgSource={sortedColumn === column ? sortedIndicatorImageSource : null}
          key={i}
          onClick={() => onClickColumn(column)}
        />
      ))}
    </div>
  );
};
 
const DataRow = ({ row, columns }) => (
  <div className="TableRow">
    {columns.map((column, i) => <DataCell key={i} column={column} content={column.rowToValue(row)} />)}
  </div>
);

DataRow.propTypes = {
  row: PropTypes.object.isRequired,
};

class DataTable extends Component {
  render() {
    const { columns, onClickColumn, rows, sortedAscending, sortedColumn } = this.props;
    return (
      <div>
        <HeaderRow
          columns={columns}
          onClickColumn={onClickColumn}
          sortedColumn={sortedColumn}
          sortedAscending={sortedAscending}
        />
        {rows.map((row, i) => <DataRow key={i} row={row} columns={columns} />)}
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortedColumn: PropTypes.object.isRequired,
  onClickColumn: PropTypes.func.isRequired,

  // optional props
  sortedAscending: PropTypes.bool,
};

DataTable.defaultProps = {
  sortedAscending: true,
};

export default DataTable;
