import React, { Component } from 'react';
import { connect } from 'react-redux';
import { leaveRequested } from '../../actions/homeUserActions';
import LeaveBookedPopup from '../popupComponents/leaveBookedPopup';
import '../home_admin/home_admin.css';

class BookLeaveForm extends Component {
  constructor() {
    super();
    this.state = {
      pickedDate: '',
    };
    this.leaveBooked = this.leaveBooked.bind(this);
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    const pdate = `${[nextProps.pickedDate.getMonth() + 1]}/${nextProps.pickedDate.getDate()}/${nextProps.pickedDate.getFullYear()}`;
    this.setState({ pickedDate: pdate });
  }
  leaveBooked() {
    const selectedform = document.forms.leaveForm;
    const leaveReason = selectedform.leaveReason.value;
    const leaveObj = {
      from: this.props.loggedinUser.id,
      to: this.props.loggedinUser.resourceManager,
      leaveDate: new Date(this.state.pickedDate),
      leaveReason,
      status: 'Requested',
      companyid: this.props.loggedinUser.companyid,
    };
    this.props.dispatch(leaveRequested(leaveObj, true));
  }
  render() {
    if (this.props.pickedDate === null) {
      return (
        <div>
          <h3>Select a date to Book Leave</h3>
        </div>
      );
    } else if (this.props.pickedDate !== null) {
      return (
        <div>
          <form name="leaveForm">
            <input type="textarea" className="leaveReasontextarea" placeholder="Write Your Reason" name="leaveReason" />
            <input type="button" className="bookleaveBut" value="Book Leave" onClick={this.leaveBooked} />
            <LeaveBookedPopup />
          </form>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    pickedDate: state.homeUserReducer.pickedDate,
    loggedinUser: state.loginReducer.loggedinUser,
    leaveBookedpopup: state.homeUserReducer.leaveBookedpopup,
  };
}

export default connect(mapStateToProps)(BookLeaveForm);
