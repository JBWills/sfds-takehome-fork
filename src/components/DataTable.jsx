import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DataCell = ({ content, isHeader, onClick }) => {
  const className = isHeader ? 'Header Cell' : 'Cell';
  return <span className={className} onClick={onClick}>{content}</span>;
};

const HeaderRow = ({ columns, onClickColumn }) => (
  <div className="TableRow">
    {columns.map((column, i) => <DataCell key={i} content={column.phrase} isHeader onClick={() => onClickColumn(column)} />)}
  </div>
);
 
const DataRow = ({ row, columns }) => (
  <div className="TableRow">
    {columns.map((column, i) => <DataCell key={i} content={column.rowToValue(row)} />)}
  </div>
);

DataRow.propTypes = {
  row: PropTypes.object.isRequired,
};

class DataTable extends Component {
  render() {
    const { columns, onClickColumn, rows } = this.props;
    return (
      <div>
        <HeaderRow columns={columns} onClickColumn={onClickColumn} />
        {rows.map((row, i) => <DataRow key={i} row={row} columns={columns} />)}
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickColumn: PropTypes.func.isRequired,
};

export default DataTable;
