import { combineReducers } from 'redux';
import testReducer from './testReducer';
import loginReducer from './loginReducer';
import homeReducer from './homeReducer';
import empCrudReducer from './empCrudReducer';
import homeUserReducer from './homeUserReducer';

const combinedReducer = combineReducers({
  testReducer,
  loginReducer,
  homeReducer,
  empCrudReducer,
  homeUserReducer,
});

export default combinedReducer;
