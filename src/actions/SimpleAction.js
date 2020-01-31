export const initHousingData = (data) => dispatch => {
  dispatch({
    type: 'INIT_HOUSING_DATA',
    payload: data,
  });
};