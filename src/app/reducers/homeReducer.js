import { EmployeeActions } from '../actions/actionTypes';

const initialState = {
  fetchedEmployees: null,
};

export default function homeReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'ErrorType.ERROR_LOG': {
      st = { ...state, message: action.message };
      break;
    }
    case EmployeeActions.FETCH_EPLOYEES: {
      st = { ...state, fetchedEmployees: action.payload };
      break;
    }
    default: {
      return st;
    }
  }
  console.log(`AFTER::${action.type},${JSON.stringify(st)}`);
  return st;
}
