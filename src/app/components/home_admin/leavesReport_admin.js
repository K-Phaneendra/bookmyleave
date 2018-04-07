import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './home_admin.css';
import { getleaveReportAdmin, leavesStatusChange } from '../../actions/homeActions';

class LeavesReportAdmin extends Component {
  constructor() {
    super();
    this.state = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      columns: this.getColumns(),
      rows: [],
    };
    this.getSno = this.getSno.bind(this);
    this.getDispDate = this.getDispDate.bind(this);
    this.getFromName = this.getFromName.bind(this);
    this.approveLeave = this.approveLeave.bind(this);
    this.rejectLeave = this.rejectLeave.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getleaveReportAdmin(this.props.loggedinUser.id));
  }
  componentWillReceiveProps(nextProps) {
    const tableData = [];
    let tableObj = {};
    nextProps.fetchedLeaveReport_Admin.map((data, i) => {
      tableObj = {};
      tableObj.id = data.id;
      tableObj.sno = this.getSno(i);
      tableObj.leaveDate = this.getDispDate(data.leaveDate);
      tableObj.leaveReason = data.leaveReason;
      tableObj.from = this.getFromName(data.from, nextProps.fetchedEmployees);
      tableObj.status = data.status;
      tableObj.act =
      (
        <div>
          {/* <input type="button" value="Approve" onClick={() => this.approveLeave(data)} /> */}
          <a className="approveico">
            <i className="fa fa-check-circle" aria-hidden="true" title="Approve" onClick={() => this.approveLeave(data)} />
          </a>
          {/* <input type="button" value="Reject" onClick={() => this.rejectLeave(data)} /> */}
          <a className="rejectico">
            <i className="fa fa-times-circle" aria-hidden="true" title="Reject" onClick={() => this.rejectLeave(data)} />
          </a>
        </div>
      );
      tableData.push(tableObj);
      return null;
    });
    this.setState({ rows: tableData });
  }
  getSno(i) {
    const sno = i + 1;
    return sno;
  }
  getDispDate(rawdate) {
    const bookedLeaveDate = new Date(rawdate);
    const month = bookedLeaveDate.getMonth();
    const dispMonth = this.state.months[month];
    const displayedDate = `${bookedLeaveDate.getDate()} ${dispMonth}, ${bookedLeaveDate.getFullYear()}`;
    return displayedDate;
  }
  getFromName(obtainedid, empDataArr) {
    if (empDataArr !== null) {
      return empDataArr.map((empData) => {
        if (obtainedid === empData.id) {
          return `${empData.name}: ${empData.code}`;
        }
        return null;
      });
    }
    return null;
  }
  getColumns() {
    const leaveReportCol = [
      { accessor: 'sno', Header: 'SNo.' },
      { accessor: 'leaveDate', Header: 'Booked Date' },
      { accessor: 'leaveReason', Header: 'Reason' },
      { accessor: 'from', Header: 'Requested By' },
      { accessor: 'status', Header: 'Status' },
      { accessor: 'act', Header: 'Actions' },
    ];
    return leaveReportCol;
  }
  approveLeave(data) {
    const tabdata = [];
    this.state.rows.map((val) => {
      tabdata.push(val);
      return null;
    });
    const tabledata = [];
    let tabobj = {};
    tabdata.map((vals) => {
      tabobj = vals;
      if (vals.id === data.id) {
        tabobj.status = 'Approved';
      }
      tabledata.push(tabobj);
      return null;
    });
    this.setState({ rows: tabledata });
    const leaveApproved = { id: data.id, status: 'Approved' };
    this.props.dispatch(leavesStatusChange(leaveApproved));
  }
  rejectLeave(data) {
    const tabdata = [];
    this.state.rows.map((val) => {
      tabdata.push(val);
      return null;
    });
    const tabledata = [];
    let tabobj = {};
    tabdata.map((vals) => {
      tabobj = vals;
      if (vals.id === data.id) {
        tabobj.status = 'Rejected';
      }
      tabledata.push(tabobj);
      return null;
    });
    this.setState({ rows: tabledata });
    const leaveApproved = { id: data.id, status: 'Rejected' };
    this.props.dispatch(leavesStatusChange(leaveApproved));
  }
  render() {
    return (
      <div>
        <ReactTable
          data={this.state.rows}
          columns={this.state.columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedinUser: state.loginReducer.loggedinUser,
    fetchedLeaveReport_Admin: state.homeReducer.fetchedLeaveReport_Admin,
    fetchedEmployees: state.empCrudReducer.fetchedEmployees,
  };
}

export default connect(mapStateToProps)(LeavesReportAdmin);
