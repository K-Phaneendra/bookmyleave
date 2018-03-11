import { combineReducers } from 'redux';
import testReducer from './testReducer';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';

const combinedReducer = combineReducers({
  testReducer,
  loginReducer,
  homeReducer,
});

export default combinedReducer;
