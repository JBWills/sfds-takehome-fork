export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
  case 'INIT_HOUSING_DATA':
    return {...state, housingRows: payload };
  case 'HOUSING_DATA_SORTED':
    return {...state, housingRows: payload.housingRows, sortedAscending: payload.sortedAscending, sortedColumn: payload.sortedColumn };
  default:
    return state;
  }
};