import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { fetchCompany, fetchEmployees } from '../../actions/homeActions';
import { openAddEmp, openEditEmp, deleteEmp } from '../../actions/empCrudActions';
import AddEmpPopup from './popupComponents/addEmpPopup';
import EditEmpPopup from './popupComponents/editEmpPopup';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      companyData: '',
      columns: this.getEmpColumns(),
      rows: [],
    };
    this.getManager = this.getManager.bind(this);
    this.addEmpPopup = this.addEmpPopup.bind(this);
    this.editempPopup = this.editempPopup.bind(this);
    this.delemp = this.delemp.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(fetchCompany(this.props.loggedinUser.companyid));
    this.props.dispatch(fetchEmployees(this.props.loggedinUser.companyid));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchedCompany !== null) {
      this.setState({ companyData: nextProps.fetchedCompany });
    }
    const displayedRows = [];
    let displayedRowsObj = {};
    if (nextProps.fetchedEmployees !== null) {
      nextProps.fetchedEmployees.map((empdata) => {
        displayedRowsObj = {};
        displayedRowsObj.name = empdata.name;
        displayedRowsObj.code = empdata.code;
        displayedRowsObj.email = empdata.email;
        displayedRowsObj.resourceManager = this.getManager(empdata.resourceManager, nextProps.fetchedEmployees);
        displayedRowsObj.act =
        (
          <div>
            <input type="button" value="Edit" onClick={() => this.editempPopup(empdata)} />
            <input type="button" value="Delete" onClick={() => this.delemp(empdata)} />
          </div>
        );
        displayedRows.push(displayedRowsObj);
        return null;
      });
    }
    this.setState({ rows: displayedRows });
  }
  getManager(managerid, data) {
    if (managerid !== undefined) {
      return data.map((empdata) => {
        if (managerid === empdata.id) {
          return empdata.name;
        }
        return null;
      });
    }
    return null;
  }
  getEmpColumns() {
    const empColumns = [
      { accessor: 'name', Header: 'Employee Name' },
      { accessor: 'code', Header: 'Employee Code' },
      { accessor: 'email', Header: 'Employee E-Mail' },
      { accessor: 'resourceManager', Header: 'Resource Manager' },
      { accessor: 'act', Header: 'Actions' },
    ];
    return empColumns;
  }
  addEmpPopup() {
    this.props.dispatch(openAddEmp(true));
  }
  editempPopup(data) {
    this.props.dispatch(openEditEmp(true, data));
  }
  delemp(data) {
    if (window.confirm('Once Deleted cannot be undone. Would like to Proceed ?') === true) {
      this.props.dispatch(deleteEmp(data));
    }
  }
  render() {
    if (this.props.fetchedEmployees !== null) {
      return (
        <div>
          <div>
            Welcome to Home Page of <b>{this.state.companyData.name}</b>
          </div>
          <div>
            <div>
              <input type="button" value="Add New Employee" onClick={this.addEmpPopup} />
              <AddEmpPopup />
              <EditEmpPopup />
            </div>
            <ReactTable
              data={this.state.rows}
              columns={this.state.columns}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    loggedinUser: state.loginReducer.loggedinUser,
    fetchedCompany: state.homeReducer.fetchedCompany,
    fetchedEmployees: state.empCrudReducer.fetchedEmployees,
  };
}

export default connect(mapStateToProps)(Home);
