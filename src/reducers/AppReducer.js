export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
  case 'INIT_HOUSING_DATA':
    return {...state, housingRows: payload};
  case 'SORTING_METHOD_CHANGED':
    return {...state, sortedAscending: payload.sortedAscending, sortedColumn: payload.sortedColumn};
  case 'FILTERS_CHANGED':
    return {...state, filters: payload.filters };
  default:
    return state;
  }
};