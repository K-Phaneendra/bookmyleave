import { combineReducers } from 'redux';
import testReducer from '../reducers/testReducer';

const combinedReducer = combineReducers({
  testReducer,
});

export default combinedReducer;
