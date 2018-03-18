import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Routes from './components/routes/routes';

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

function mapStateToProps() {
  return null;
}

export default connect(mapStateToProps)(App);
