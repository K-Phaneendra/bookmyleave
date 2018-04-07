import axios from 'axios';
import { RegistrationURLs, EmployeesUrls } from './actionURLs';
import { Configs } from './actionConfigs';
// import { ErrorType } from './actionTypes';
import { LoginActions } from './actionTypes';

// check companyname if already registered or not and
// then add data to 'employees' & 'companies' collections
export function registeredCompany(registeredComp) {
  return function () {
    axios
      .post(RegistrationURLs.CHECK_REGISTERED_COMP, JSON.stringify(registeredComp), Configs.CONFIG)
      .then((response) => {
        if (response.data.length > 0) {
          alert('Sorry, Company Name already exists');
        } else {
          // adding data in employees & companies collections
          axios
            .post(EmployeesUrls.EMPLOYEE_REGISTERED, JSON.stringify(registeredComp), Configs.CONFIG)
            .then((res) => {
              if (res.data !== null) {
                alert('Congratulations, Registration Successful');
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// check login credentials with DB
export function loginCredentials(loginCred) {
  return function (dispatch) {
    axios
      .post(EmployeesUrls.CHECK_LOGIN, JSON.stringify(loginCred), Configs.CONFIG)
      .then((res) => {
        if (res.data.length === 0) {
          alert('Sorry, no details found, You need to Register First');
        } else if (res.data.login === 'INVALID_PASS') {
          alert('Password Mismatched, try again');
        } else {
          // alert('Login Successful');
          const initialState = {};
          let loggedinUserClone = {};
          res.data.map((data) => {
            loggedinUserClone = data;
            return null;
          });
          const code = res.data[0].code.split('_');
          initialState.loggedinUser = loggedinUserClone;
          initialState.loggedinUserType = code[0];
          if (code[0] === 'admin') {
            localStorage.setItem('BML_user', JSON.stringify(initialState));
            window.location.replace('/#/admin');
            dispatch({ type: LoginActions.LOGIN_SUCCESSFUL, payload: res.data, logintype: code[0] });
          } else {
            localStorage.setItem('BML_user', JSON.stringify(initialState));
            window.location.replace('/#/user');
            dispatch({ type: LoginActions.LOGIN_SUCCESSFUL, payload: res.data, logintype: code[0] });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// logout clicked
export function userLogoutFunction() {
  return function (dispatch) {
    dispatch({ type: LoginActions.LOGOUTCLICKED, data: null });
  };
}
