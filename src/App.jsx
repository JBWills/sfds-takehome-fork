import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { initHousingData, handleColumnClicked, handleFilterChanged } from './actions/HousingTableActionCreators';
import data from './sfgovdata.json';
import DataTable from './components/DataTable';
import { VISIBLE_COLUMNS } from './util/Constants';
import FilterPanel from './components/FilterPanel';
import { getFilteredSortedRows } from './selectors';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

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
      <div>
        <AppHeader />
        <div className="AppContainer">
          <div className="InfoContainer">
            <div className="Title">
              {'Affordable Rental Portfolio'}
            </div>
            <div className="Description">
              {'Affordable rental housing developed in partnership with non-profit and private developers and financed by the Mayor’s Office of Housing and Community Development (MOHCD) and the Office of Community Investment and Infrastructure (OCII) through City Funding Agreements, Ground Leases, Disposition & Participation Agreements and Conduit Mortgage Revenue Bond Financing, as of December 31, 2018.'}
            </div>
          </div>

          <FilterPanel
            filters={filters}
            onFilterChanged={this.onFilterChanged}
          />

          <div className="DataTableContainer">
            <DataTable
              columns={VISIBLE_COLUMNS}
              onClickColumn={this.onClickColumn}
              rows={housingRows}
              sortedAscending={sortedAscending}
              sortedColumn={sortedColumn}
            />
          </div>
        </div>

        <AppFooter
          siteUpdatedAt={siteUpdatedAt}
          dataLastUpdatedAt={dataLastUpdatedAt}
          metaDataLastUpdatedAt={metaDataLastUpdatedAt}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);