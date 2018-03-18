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
          console.log(res, 'line47');
          const code = res.data[0].code.split('_');
          if (code[0] === 'admin') {
            window.location.href = '/#/admin';
            dispatch({ type: LoginActions.LOGIN_SUCCESSFUL, payload: res.data, logintype: code[0] });
          } else {
            window.location.href = '/#/user';
            dispatch({ type: LoginActions.LOGIN_SUCCESSFUL, payload: res.data, logintype: code[0] });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
