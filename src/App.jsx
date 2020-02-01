import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { initHousingData, handleColumnClicked } from './actions/HousingTableActionCreators';
import data from './sfgovdata.json';
import DataTable from './components/DataTable';
import { VISIBLE_COLUMNS } from './util/Constants';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  initHousingData: (data) => dispatch(initHousingData(data)),
  handleColumnClicked: (data) => dispatch(handleColumnClicked(data)),
});


export class App extends Component {
  constructor(props) {
    super(props);

    this.onClickColumn = this.onClickColumn.bind(this);
  }

  componentDidMount() {
    this.props.initHousingData(data);
  }

  onClickColumn(column) {
    this.props.handleColumnClicked(column);
  }

  render() {
    const { housingRows } = this.props;

    return (
      <div>
        <DataTable columns={VISIBLE_COLUMNS} rows={housingRows} onClickColumn={this.onClickColumn} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);