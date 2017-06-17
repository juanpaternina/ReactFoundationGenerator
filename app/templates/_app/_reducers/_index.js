import { combineReducers } from 'redux';
import MainReducer from './MainReducer.js';

const appReducer = combineReducers({
  main: MainReducer,
});

export default appReducer;
