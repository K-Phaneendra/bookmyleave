import axios from 'axios';
import { CompaniesUrls, EmployeesUrls, LeaveRequestsURLs } from './actionURLs';
import { Configs } from './actionConfigs';
// import { ErrorType } from './actionTypes';
import { CompanyActions, EmployeeActions, LeaveReportAdmin } from './actionTypes';

// fetching companies DB
export function fetchCompany(id) {
  return function (dispatch) {
    axios
      .get(`${CompaniesUrls.COMPANIES_API}/${id}`, Configs.CONFIG)
      .then((response) => {
        dispatch({ type: CompanyActions.FETCH_COMPANY, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
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
// fetching leave reports admin
export function getleaveReportAdmin(adminid) {
  return function (dispatch) {
    const url = `${LeaveRequestsURLs.GETLEAVEDATA_BYTOID}/${adminid}`;
    axios
      .get(url, Configs.CONFIG)
      .then((res) => {
        dispatch({ type: LeaveReportAdmin.FETCHED_ADMINLEAVEREPORT, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
// leave status changed by admin
export function leavesStatusChange(updateLeaveStatus) {
  return function () {
    const url = `${LeaveRequestsURLs.LEAVEREQUESTS_API}/${updateLeaveStatus.id}`;
    axios
      .put(url, updateLeaveStatus, Configs.CONFIG)
      .catch((err) => {
        console.log(err);
      });
  };
}
