import { LoginActions } from '../actions/actionTypes';

const initialState = {
  loggedinUser: null,
  loggedinUserType: '',
};

function getInitialState() {
  const loggedInUserData = localStorage.getItem('BML_user');
  if (loggedInUserData !== null) {
    return JSON.parse(loggedInUserData);
  } else if (loggedInUserData === null) {
    return initialState;
  }
  return null;
}
export default function loginReducer(state = getInitialState(), action) {
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
      st = { ...state, loggedinUser: loggedinUserClone, loggedinUserType: action.logintype };
      break;
    }
    case LoginActions.LOGOUTCLICKED: {
      st = { ...state, loggedinUser: action.data, loggedinUserType: '' };
      break;
    }
    default: {
      return st;
    }
  }
  console.log(`AFTER::${action.type},${JSON.stringify(st)}`);
  return st;
}
