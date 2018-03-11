import axios from 'axios';
import { EmployeesUrls } from './actionURLs';
import { Configs } from './actionConfigs';
// import { ErrorType } from './actionTypes';
import { EmployeeActions } from './actionTypes';

// fetching employees data from DB
export function fetchEmployees(id) {
  const compid = {
    companyid: id,
  };
  return function (dispatch) {
    axios
      .post(EmployeesUrls.FETCH_EMPLOYEES, JSON.stringify(compid), Configs.CONFIG)
      .then((response) => {
        dispatch({ type: EmployeeActions.FETCH_EPLOYEES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
