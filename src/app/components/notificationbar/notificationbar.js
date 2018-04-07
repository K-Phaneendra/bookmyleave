import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogoutFunction } from '../../actions/registrationActions';

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
      <div>
        <ul>
          <a // eslint-disable-line
            onClick={this.logoutFunction}
            role="button"
            tabIndex="0"
          >
            <li>Logout</li>
          </a>
        </ul>
      </div>
    );
  }
}

function mapStateToProps() {
  return null;
}

export default connect(mapStateToProps)(NotificationBar);
