import { LoginActions } from '../actions/actionTypes';

const initialState = {
  loggedinUser: null,
};

export default function loginReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'ErrorType.ERROR_LOG': {
      st = { ...state, message: action.message };
      break;
    }
    case LoginActions.LOGIN_SUCCESSFUL: {
      let loggedinUserClone = {};
      action.payload.map((data) => {
        loggedinUserClone = data;
        return null;
      });
      st = { ...state, loggedinUser: loggedinUserClone };
      break;
    }
    default: {
      return st;
    }
  }
  console.log(`AFTER::${action.type},${JSON.stringify(st)}`);
  return st;
}
