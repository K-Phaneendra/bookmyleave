import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { leaveRequested } from '../../actions/homeUserActions';

class LeaveBookedPopup extends Component {
  constructor() {
    super();
    this.state = {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      displayedDate: '',
    };
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.leaveBookedData !== null) {
      const bookedLeaveDate = new Date(nextProps.leaveBookedData.leavedata.leaveDate);
      const month = bookedLeaveDate.getMonth();
      const dispMonth = this.state.months[month];
      const displayedDate = `${bookedLeaveDate.getDate()} ${dispMonth}, ${bookedLeaveDate.getFullYear()}`;
      this.setState({ displayedDate });
    }
  }
  onCloseModal() {
    this.props.dispatch(leaveRequested(null, false));
  }
  render() {
    if (this.props.leaveBookedpopup === true) {
      return (
        <div>
          <Modal open={this.props.leaveBookedpopup} onClose={this.onCloseModal}>
            <div>
              Your Leave Request has been Booked
              <table>
                <tr>
                  <td>Booked Date</td>
                  <td>Booked Reason</td>
                  <td>Requested To</td>
                </tr>
                <tr>
                  <td>{this.state.displayedDate}</td>
                  <td>{this.props.leaveBookedData.leavedata.leaveReason}</td>
                  <td>{this.props.leaveBookedData.toName}</td>
                </tr>
              </table>
            </div>
          </Modal>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    leaveBookedpopup: state.homeUserReducer.leaveBookedpopup,
    leaveBookedData: state.homeUserReducer.leaveBookedData,
  };
}

export default connect(mapStateToProps)(LeaveBookedPopup);
