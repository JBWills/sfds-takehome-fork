import React from 'react';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import FilterPanel from './FilterPanel';
import DataTable from './DataTable';
import { VISIBLE_COLUMNS } from '../util/Constants';

const MainPageContainer = ({
  filters,
  housingRows,
  sortedAscending,
  sortedColumn,
  onClickColumn,
  onFilterChanged,
  siteUpdatedAt,
  dataLastUpdatedAt,
  metaDataLastUpdatedAt,
}) => (
  <div>
    <AppHeader />
    <div className="AppContainer">
      <div className="InfoContainer">
        <div className="Title">{'Affordable Rental Portfolio'}</div>
        <div className="Description">
          {
            'Affordable rental housing developed in partnership with non-profit and private developers and financed by the Mayor’s Office of Housing and Community Development (MOHCD) and the Office of Community Investment and Infrastructure (OCII) through City Funding Agreements, Ground Leases, Disposition & Participation Agreements and Conduit Mortgage Revenue Bond Financing, as of December 31, 2018.'
          }
        </div>
      </div>

      <FilterPanel filters={filters} onFilterChanged={onFilterChanged} />

      <div className="DataTableContainer">
        <DataTable
          columns={VISIBLE_COLUMNS}
          onClickColumn={onClickColumn}
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

export default MainPageContainer;
