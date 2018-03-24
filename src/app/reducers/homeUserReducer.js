import { UserActions } from '../actions/actionTypes';

const initialState = {
  pickedDate: null,
  leaveBookedpopup: null,
  leaveBookedData: null,
};

export default function homeUserReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'ErrorType.ERROR_LOG': {
      st = { ...state, message: action.message };
      break;
    }
    case UserActions.PICKED_DATE: {
      st = { ...state, pickedDate: action.data };
      break;
    }
    case UserActions.LEAVE_REQUESTED: {
      st = { ...state, leaveBookedpopup: action.toggleMsgPopup, leaveBookedData: action.payload };
      break;
    }
    default: {
      return st;
    }
  }
  console.log(`AFTER::${action.type},${JSON.stringify(st)}`);
  return st;
}
