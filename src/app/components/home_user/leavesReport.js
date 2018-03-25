import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { fetchLeaveReportfromDB } from '../../actions/homeUserActions';
import { fetchEmployees } from '../../actions/homeActions';

class LeavesReport extends Component {
  constructor() {
    super();
    this.state = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      columns: this.getReportColumns(),
      rows: [],
    };
    this.getSno = this.getSno.bind(this);
    this.getDispDate = this.getDispDate.bind(this);
    this.getToName = this.getToName.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(fetchLeaveReportfromDB(this.props.loggedinUser.id));
    this.props.dispatch(fetchEmployees(this.props.loggedinUser.companyid));
  }
  componentWillReceiveProps(nextProps) {
    const reportArr = [];
    let reportObj = {};
    if (nextProps.leaveReportofUser !== null && nextProps.fetchedEmployees !== null) {
      nextProps.leaveReportofUser.map((data, i) => {
        reportObj = {};
        reportObj.sno = this.getSno(i);
        reportObj.leaveDate = this.getDispDate(data.leaveDate);
        reportObj.leaveReason = data.leaveReason;
        reportObj.to = this.getToName(data.to, nextProps.fetchedEmployees);
        reportObj.status = data.status;
        reportArr.push(reportObj);
        return null;
      });
      this.setState({ rows: reportArr });
    }
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
  getToName(obtainedid, empDataArr) {
    if (empDataArr !== null) {
      return empDataArr.map((empData) => {
        if (obtainedid === empData.id) {
          return empData.name;
        }
        return null;
      });
    }
    return null;
  }
  getReportColumns() {
    const leaveReportCol = [
      { accessor: 'sno', Header: 'SNo.' },
      { accessor: 'leaveDate', Header: 'Booked Date' },
      { accessor: 'leaveReason', Header: 'Reason' },
      { accessor: 'to', Header: 'Approver' },
      { accessor: 'status', Header: 'Status' },
    ];
    return leaveReportCol;
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
    leaveReportofUser: state.homeUserReducer.leaveReportofUser,
    fetchedEmployees: state.empCrudReducer.fetchedEmployees,
  };
}

export default connect(mapStateToProps)(LeavesReport);
