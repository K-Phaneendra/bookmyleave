import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeUser extends Component {
  render() {
    return (
      <div>
        this is user home
      </div>
    );
  }
}

function mapStateToProps() {
  return null;
}

export default connect(mapStateToProps)(HomeUser);
