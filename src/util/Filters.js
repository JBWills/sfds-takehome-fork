export const FILTER_TYPE = {
  NUMERIC: 'numeric',
  STRING: 'string',
};

const rowPassesNumericFilter = (filter, row) => {
  const intVal = parseInt(filter.column.rowToValue(row));
  return intVal >= filter.min && intVal <= filter.max;
};

const rowPassesStringFilter = (filter, row) => {
  if (!filter.column.rowToValue(row)) {
    return false;
  }

  return filter.column.rowToValue(row).includes(filter.searchVal);
};

/**
 * @param filters
 * @param row
 * return true if the row passes all filter checks (meaning it should not be filtered out).
 */
export const rowPassesFilters = (filters, row) => {
  for (let column in filters) {
    let filter = filters[column];
    if (!filter.enabled) {
      continue;
    }

    if (
      filter.filterType === FILTER_TYPE.NUMERIC &&
      !rowPassesNumericFilter(filter, row)
    ) {
      return false;
    }

    if (
      filter.filterType === FILTER_TYPE.STRING &&
      !rowPassesStringFilter(filter, row)
    ) {
      return false;
    }
  }

  return true;
};

export const createStringFilter = (column, enabled = false, searchVal = '') => {
  return {
    filterType: FILTER_TYPE.STRING,
    column,
    enabled,
    searchVal,
  };
};

export const createNumericFilter = (
  column,
  enabled = false,
  min = 0,
  max = Number.MAX_SAFE_INTEGER
) => {
  return {
    filterType: FILTER_TYPE.NUMERIC,
    column,
    enabled,
    min,
    max,
  };
};
