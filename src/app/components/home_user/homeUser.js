import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import NotificationBar from '../notificationbar/notificationbar';
import { userPickedDate } from '../../actions/homeUserActions';
import BookLeaveForm from './bookLeaveForm';
import LeavesReport from './leavesReport';
import '../home_admin/home_admin.css';

class HomeUser extends Component {
  constructor() {
    super();
    this.state = {
      today: null,
      minDate: null,
    };
    this.dateselected = this.dateselected.bind(this);
  }
  componentWillMount() {
    const today = new Date();
    const beforeweek = (24 * 60 * 60 * 1000) * 7; // One week before today
    const minDate = Number(today - beforeweek);
    this.setState({ today, minDate });
  }
  dateselected(pickedDate) {
    this.props.dispatch(userPickedDate(pickedDate));
  }
  render() {
    return (
      <div>
        <div>
          <NotificationBar />
        </div>
        <div className="adminHeading">
          Welcome <b>{this.props.loggedinUser.name}</b>
        </div>
        <div className="lftReport_user">
          <InfiniteCalendar
            width={400}
            height={600}
            selectedDate={this.state.today}
            disabledDays={[0, 6]}
            minDate={this.state.minDate}
            keyboardSupport="true"
            onSelect={this.dateselected}
          />
        </div>
        <div className="rhtEmp_user">
          <div className="tableHead">
            <BookLeaveForm />
          </div>
          <LeavesReport />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedinUser: state.loginReducer.loggedinUser,
  };
}

export default connect(mapStateToProps)(HomeUser);
