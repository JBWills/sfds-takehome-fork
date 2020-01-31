export default (state = {}, action) => {
  switch (action.type) {
  case 'INIT_HOUSING_DATA':
    return {...state, housingRows: action.payload };
  default:
    return state;
  }
};