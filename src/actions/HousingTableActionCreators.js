import { createHistogramsForFilters } from '../util/Filters';

export const initHousingData = data => (dispatch, getState) => {
  const { filters } = getState();

  const histograms = createHistogramsForFilters(50, filters, data);
  dispatch({
    type: 'INIT_HOUSING_DATA',
    payload: {
      housingRows: data,
      histograms,
    },
  });
};

export const handleFilterChanged = newFilterState => (dispatch, getState) => {
  const { filters } = getState();

  const newFilters = {
    ...filters,
    [newFilterState.column.key]: newFilterState,
  };

  dispatch({
    type: 'FILTERS_CHANGED',
    payload: {
      filters: newFilters,
    },
  });
};

export const handleColumnClicked = column => (dispatch, getState) => {
  const { sortedColumn, sortedAscending } = getState();

  const shouldSortAscending =
    sortedColumn === null || sortedColumn !== column || !sortedAscending;

  dispatch({
    type: 'SORTING_METHOD_CHANGED',
    payload: {
      sortedColumn: column,
      sortedAscending: shouldSortAscending,
    },
  });
};
