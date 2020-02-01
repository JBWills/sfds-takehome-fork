import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/AppReducer';

const defaultState = {
  housingRows: [],
  sortedColumn: null,
  sortedAscending: true,
};

export default function configureStore() {
  return createStore(
    rootReducer,
    defaultState,
    applyMiddleware(thunk)
  );
}