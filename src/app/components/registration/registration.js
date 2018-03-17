import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registeredCompany, loginCredentials } from '../../actions/registrationActions';

class Registration extends Component {
  constructor() {
    super();
    this.submitRegistration = this.submitRegistration.bind(this);
    this.checkPass = this.checkPass.bind(this);
    this.submitlogin = this.submitlogin.bind(this);
  }
  checkPass(event) {
    if (event.keyCode === 13) {
      this.submitlogin();
    }
  }
  submitlogin() {
    const selectedLoginform = document.forms.loginform;
    const loginemail = selectedLoginform.loginemail.value;
    const loginpass = selectedLoginform.loginpass.value;
    if (loginemail === '' || loginpass === '') {
      alert('both fields are mandatory');
    } else {
      const loginCred = {
        email: loginemail,
        password: loginpass,
      };
      this.props.dispatch(loginCredentials(loginCred));
    }
  }
  submitRegistration() {
    const selectedform = document.forms.registrationform;
    const compname = selectedform.compname.value;
    const adminname = selectedform.adminname.value;
    const adminemail = selectedform.adminemail.value;
    const pass1 = selectedform.pass1.value;
    const pass2 = selectedform.pass2.value;
    if (compname === '' || adminname === '' || adminemail === '' || pass1 === '' || pass2 === '') {
      alert('all fields are mandatory');
    } else if (pass1 !== pass2) {
      alert('passwords did not match');
    } else {
      const registeredComp = {
        name: compname,
        empCollection: {
          name: adminname,
          code: `admin_${compname}`,
          email: adminemail,
          password: pass1,
        },
      };
      this.props.dispatch(registeredCompany(registeredComp));
    }
  }
  render() {
    return (
      <div>
        <div>
          <div>
            <h3>User Login</h3>
          </div>
          <form name="loginform">
            <label htmlFor="loginemail">E-Mail
              <input type="text" id="loginemail" name="loginemail" />
            </label><br />
            <label htmlFor="loginpass">Password
              <input type="password" id="loginpass" name="loginpass" onKeyDown={this.checkPass} />
            </label><br />
            <div>
              <input type="button" value="Login" onClick={this.submitlogin} />
            </div>
          </form>
        </div>
        <div>
          <h3>Company Registration Form</h3>
        </div>
        <form name="registrationform">
          <label htmlFor="compname">Company Name
            <input type="text" id="compname" name="compname" />
          </label><br />
          <label htmlFor="adminname">Admin Name
            <input type="text" id="adminname" name="adminname" />
          </label><br />
          <label htmlFor="adminemail">Admin E-Mail
            <input type="text" id="adminemail" name="adminemail" />
          </label><br />
          <label htmlFor="pass1">Password
            <input type="password" id="pass1" name="pass1" />
          </label><br />
          <label htmlFor="pass2">Confirm Password
            <input type="password" id="pass2" name="pass2" />
          </label><br />
          <div>
            <input type="button" value="Register" onClick={this.submitRegistration} />
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps() {
  return null;
}
export default connect(mapStateToProps)(Registration);
