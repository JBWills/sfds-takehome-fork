import { createSelector } from 'reselect';
import { rowPassesFilters } from './util/Filters';

const getFilters = (state) => state.filters;

const getHousingRows = (state) => state.housingRows;

const getSortedColumn = (state) => state.sortedColumn;

const getSortedAscending = (state) => state.sortedAscending;

const getSortedRows = createSelector(
  [ getHousingRows, getSortedColumn, getSortedAscending ],
  (rows, sortedColumn, sortedAscending) => {
    if (!sortedColumn) {
      return rows;
    }

    return [...rows].sort((a, b) => sortedColumn.comparator(a, b, sortedColumn, sortedAscending));
  },
);

export const getFilteredSortedRows = createSelector(
  [ getSortedRows, getFilters ],
  (rows, filters) => rows.filter(row => rowPassesFilters(filters, row))
);