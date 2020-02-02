import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { initHousingData, handleColumnClicked, handleFilterChanged } from './actions/HousingTableActionCreators';
import data from './sfgovdata.json';
import { getFilteredSortedRows } from './selectors';
import MainPageContainer from './components/MainPageContainer';

const mapStateToProps = state => ({
  ...state,
  housingRows: getFilteredSortedRows(state),
});

const mapDispatchToProps = dispatch => ({
  initHousingData: (data) => dispatch(initHousingData(data)),
  handleColumnClicked: (data) => dispatch(handleColumnClicked(data)),
  handleFilterChanged: (data) => dispatch(handleFilterChanged(data)),
});


export class App extends Component {
  constructor(props) {
    super(props);

    this.onClickColumn = this.onClickColumn.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }

  componentDidMount() {
    this.props.initHousingData(data);
  }

  onClickColumn(column) {
    this.props.handleColumnClicked(column);
  }

  onFilterChanged(updatedFilter) {
    this.props.handleFilterChanged(updatedFilter);
  }

  render() {
    const {
      dataLastUpdatedAt,
      filters,
      housingRows,
      metaDataLastUpdatedAt,
      siteUpdatedAt,
      sortedAscending,
      sortedColumn,
    } = this.props;

    return (
      <MainPageContainer
        dataLastUpdatedAt={dataLastUpdatedAt}
        filters={filters}
        housingRows={housingRows}
        metaDataLastUpdatedAt={metaDataLastUpdatedAt}
        siteUpdatedAt={siteUpdatedAt}
        sortedAscending={sortedAscending}
        sortedColumn={sortedColumn}
        onClickColumn={this.onClickColumn}
        onFilterChanged={this.onFilterChanged}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);