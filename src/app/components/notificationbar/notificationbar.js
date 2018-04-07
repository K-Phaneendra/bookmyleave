import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogoutFunction } from '../../actions/registrationActions';
import logo from '../../extras/logo.svg';
import './notificationbar.css';

class NotificationBar extends Component {
  constructor() {
    super();
    this.logoutFunction = this.logoutFunction.bind(this);
  }
  logoutFunction() {
    this.props.dispatch(userLogoutFunction());
    localStorage.removeItem('BML_user');
    window.location.href = '#/';
    window.location.reload();
  }
  render() {
    return (
      <div className="notificationbar">
        <div className="logodiv">
          <img className="logo" src={logo} alt="logo" title="Book My Leave" />
        </div>
        <div className="notificationtitleDiv">
          <p className="notificationtitle" title="Book My Leave">BOOK MY LEAVE</p>
        </div>
        <div className="optionsDiv">
          <ul>
            <a // eslint-disable-line
              onClick={this.logoutFunction}
            >
              <li className="logoutOption">Logout</li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return null;
}

export default connect(mapStateToProps)(NotificationBar);
