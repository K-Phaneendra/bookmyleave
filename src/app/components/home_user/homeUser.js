import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { userPickedDate } from '../../actions/homeUserActions';
import BookLeaveForm from './bookLeaveForm';
import LeavesReport from './leavesReport';

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
        <div>
          <BookLeaveForm />
        </div>
        <div>
          <LeavesReport />
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return null;
}

export default connect(mapStateToProps)(HomeUser);
