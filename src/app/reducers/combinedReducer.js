import { combineReducers } from 'redux';
import testReducer from './testReducer';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';
import empCrudReducer from './empCrudReducer';

const combinedReducer = combineReducers({
  testReducer,
  loginReducer,
  homeReducer,
  empCrudReducer,
});

export default combinedReducer;
