import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import Registration from '../registration/registration';
import Home from '../homePage/home';
import HomeUser from '../homePage/homeUser';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.displayApp = this.displayApp.bind(this);
  }
  componentWillReceiveProps() {
  }
  displayApp() {
    if (this.props.loggedinUser === null) {
      return (
        <div>
          <HashRouter>
            <div>
              <Route exact path="/" component={Registration} />
            </div>
          </HashRouter>
        </div>
      );
    } else if (this.props.loggedinUser !== null) {
      if (this.props.loggedinUserType === 'admin') {
        return (
          <div>
            <HashRouter>
              <div>
                <Route exact path="/admin" component={Home} />
              </div>
            </HashRouter>
          </div>
        );
      } else if (this.props.loggedinUserType !== 'admin') {
        return (
          <div>
            <HashRouter>
              <div>
                <Route exact path="/user" component={HomeUser} />
              </div>
            </HashRouter>
          </div>
        );
      }
    }
    return null;
  }
  render() {
    return (
      <div>
        {this.displayApp()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedinUser: state.loginReducer.loggedinUser,
    loggedinUserType: state.loginReducer.loggedinUserType,
  };
}

export default connect(mapStateToProps)(Routes);
