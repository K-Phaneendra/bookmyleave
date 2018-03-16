import axios from 'axios';
import { EmployeesUrls } from './actionURLs';
import { Configs } from './actionConfigs';
// import { ErrorType } from './actionTypes';
import { EmployeeActions } from './actionTypes';

// open add emp popup
export function openAddEmp(bool) {
  return function (dispatch) {
    dispatch({ type: EmployeeActions.ADD_NEW_EMP_POPUP, payload: bool });
  };
}

// add new emp
export function addNewEmp(newemp) {
  return function (dispatch) {
    axios
      .post(EmployeesUrls.EMPLOYEE_API, JSON.stringify(newemp), Configs.CONFIG)
      .then((res) => {
        dispatch({ type: EmployeeActions.ADD_NEW_EMP, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// open edit emp popup
export function openEditEmp(bool, data) {
  return function (dispatch) {
    dispatch({ type: EmployeeActions.EDIT_EMP_POPUP, bool, payload: data });
  };
}

// update emp
export function editEmp(editemp) {
  return function (dispatch) {
    const updateURL = `${EmployeesUrls.EMPLOYEE_API}/${editemp.id}`;
    axios
      .put(updateURL, { name: editemp.name, email: editemp.email }, Configs.CONFIG)
      .then((res) => {
        dispatch({ type: EmployeeActions.UPDATE_EMP, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// delete emp
export function deleteEmp(emp) {
  return function (dispatch) {
    const deleteURL = `${EmployeesUrls.EMPLOYEE_API}/${emp.id}`;
    axios
      .delete(deleteURL, Configs.CONFIG)
      .then((res) => {
        console.log(res);
        dispatch({ type: EmployeeActions.DEL_EMP, payload: emp });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
