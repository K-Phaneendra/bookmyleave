import { CompanyActions } from '../actions/actionTypes';

const initialState = {
  fetchedCompany: null,
};

export default function homeReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'ErrorType.ERROR_LOG': {
      st = { ...state, message: action.message };
      break;
    }
    case CompanyActions.FETCH_COMPANY: {
      st = { ...state, fetchedCompany: action.payload };
      break;
    }
    default: {
      return st;
    }
  }
  console.log(`AFTER::${action.type},${JSON.stringify(st)}`);
  return st;
}
