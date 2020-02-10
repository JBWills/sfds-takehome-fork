import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/AppReducer';
import { createNumericFilter, createStringFilter } from './util/Filters';
import { FILTERABLE_COLUMNS } from './util/Constants';
import { formatTimestamp } from './util/DateFormat';

const createDefaultFilters = () => {
  const filters = {};
  FILTERABLE_COLUMNS.forEach(
    column =>
      (filters[column.key] = column.isNumeric
        ? createNumericFilter(column)
        : createStringFilter(column))
  );

  return filters;
};

const defaultState = {
  housingRows: [],
  sortedColumn: null,
  sortedAscending: true,
  filters: createDefaultFilters(),

  histograms: {},

  // These would be passed via bootstrapped data from backend in a real app
  siteUpdatedAt: formatTimestamp(1580601600),
  dataLastUpdatedAt: formatTimestamp(1558396800),
  metaDataLastUpdatedAt: formatTimestamp(1567728000),
};

export default function configureStore() {
  return createStore(rootReducer, defaultState, applyMiddleware(thunk));
}
