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
        console.log(res);
        if (res.data.length === 0) {
          alert('Sorry, no details found, You need to Register First');
        } else {
          alert('Login Successful');
          dispatch({ type: LoginActions.LOGIN_SUCCESSFUL, payload: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
