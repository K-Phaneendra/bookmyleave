import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ReactDataGrid from 'react-data-grid';
import { fetchEmployees } from '../../actions/homeActions';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      // columns: this.getEmpColumns(),
      // rows: null,
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchEmployees(this.props.loggedinUser.companyid));
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.fetchedEmployees);
  }
  getEmpColumns() {
  }

  render() {
    return (
      <div>
        <div>
          CRUD on employees
          {/* <ReactDataGrid
            columns={this.state.columns}
            // rowGetter={rowGetter}
            // rowsCount={rows.length}
            minHeight={500}
          /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedinUser: state.loginReducer.loggedinUser,
    fetchedEmployees: state.homeReducer.fetchedEmployees,
  };
}

export default connect(mapStateToProps)(Home);
