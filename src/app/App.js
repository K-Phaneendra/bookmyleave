import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.sendData = this.sendData.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.abcd !== '') {
      alert(nextProps.abcd);
    }
  }

  sendData() {
    this.props.dispatch({ type: 'TESTING', payload: 'abcd' });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="button" onClick={() => this.sendData()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    abcd: state.testReducer.abcd,
  };
}

export default connect(mapStateToProps)(App);
