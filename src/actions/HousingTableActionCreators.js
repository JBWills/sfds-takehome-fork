export const initHousingData = (data) => dispatch => {
  dispatch({
    type: 'INIT_HOUSING_DATA',
    payload: data,
  });
};

export const handleColumnClicked = column => (dispatch, getState) => {
  const { sortedColumn, sortedAscending } = getState();

  if (sortedColumn === null || sortedColumn !== column) {
    dispatch(sortBy(column, true));
  }

  dispatch(sortBy(column, !sortedAscending));
};

export const sortBy = (column, ascending=true) => (dispatch, getState) => {
  const { housingRows } = getState();
  dispatch({
    type: 'HOUSING_DATA_SORTED',
    payload: {
      housingRows: [...housingRows].sort((a, b) => column.comparator(a, b, column, ascending)),
      sortedColumn: column,
      sortedAscending: ascending,
    },
  });
};