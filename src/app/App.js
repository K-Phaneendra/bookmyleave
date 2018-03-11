import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Registration from './components/registration/registration';
import Home from './components/homePage/home';

class App extends Component {
  constructor() {
    super();
    this.displayApp = this.displayApp.bind(this);
  }
  componentWillReceiveProps() {
  }
  displayApp() {
    if (this.props.loggedinUser === null) {
      return (
        <div className="App">
          <Registration />
        </div>
      );
    } else if (this.props.loggedinUser !== null) {
      return (
        <div className="App">
          <Home />
        </div>
      );
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
  };
}

export default connect(mapStateToProps)(App);
