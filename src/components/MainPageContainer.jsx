import React from 'react';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import FilterPanel from './FilterPanel';
import DataTable from './datatable/DataTable';
import { VISIBLE_COLUMNS } from '../util/Constants';
import { createUseStyles } from 'react-jss';
import { SMALL_BREAKPOINT, MEDIUM_BREAKPOINT } from '../util/jssConstants';

const useStyles = createUseStyles({
  appContainer: {
    padding: '10px',
  },

  title: {
    fontSize: 'x-large',
    paddingBottom: '20px',
  },

  description: {
    marginBottom: '20px',
  },

  dataTableContainer: {},

  [SMALL_BREAKPOINT]: {
    appContainer: {
      padding: '10px',
    },
    dataTableContainer: {
      marginLeft: '-10px',
      marginRight: '-10px',
    },
    description: {
      fontSize: '90%',
    },
  },
  [MEDIUM_BREAKPOINT]: {
    appContainer: {
      paddingLeft: '10%',
      paddingRight: '10%',
    },
    dataTableContainer: {
      marginLeft: '0px',
      marginRight: '0px',
    },
  },
});

const MainPageContainer = ({
  filters,
  histograms,
  housingRows,
  sortedAscending,
  sortedColumn,
  onClickColumn,
  onFilterChanged,
  siteUpdatedAt,
  dataLastUpdatedAt,
  metaDataLastUpdatedAt,
}) => {
  const classes = useStyles();
  return (
    <div>
      <AppHeader />
      <div className={classes.appContainer}>
        <div>
          <div className={classes.title}>{'Affordable Rental Portfolio'}</div>
          <div className={classes.description}>
            {
              'Affordable rental housing developed in partnership with non-profit and private developers and financed by the Mayor’s Office of Housing and Community Development (MOHCD) and the Office of Community Investment and Infrastructure (OCII) through City Funding Agreements, Ground Leases, Disposition & Participation Agreements and Conduit Mortgage Revenue Bond Financing, as of December 31, 2018.'
            }
          </div>
        </div>

        <FilterPanel
          key={filters}
          filters={filters}
          histograms={histograms}
          onFilterChanged={onFilterChanged}
        />

        <div className={classes.dataTableContainer}>
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
};

export default MainPageContainer;
