import axios from 'axios';
import { LeaveRequestsURLs } from './actionURLs';
import { Configs } from './actionConfigs';
// import { ErrorType } from './actionTypes';
import { UserActions } from './actionTypes';

// user selected date to book leave
export function userPickedDate(pickedDate) {
  return function (dispatch) {
    dispatch({ type: UserActions.PICKED_DATE, data: pickedDate });
  };
}

export function leaveRequested(requested, bool) {
  return function (dispatch) {
    if (requested !== null) {
      axios
        .post(LeaveRequestsURLs.LEAVEREQUESTS_API, JSON.stringify(requested), Configs.CONFIG)
        .then((res) => {
          dispatch({ type: UserActions.LEAVE_REQUESTED, toggleMsgPopup: bool, payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch({ type: UserActions.LEAVE_REQUESTED, toggleMsgPopup: bool, payload: null });
    }
  };
}
