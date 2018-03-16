import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { openEditEmp, editEmp } from '../../../actions/empCrudActions';

class EditEmpPopup extends Component {
  constructor() {
    super();
    this.onCloseModal = this.onCloseModal.bind(this);
    this.submitEditEmp = this.submitEditEmp.bind(this);
  }
  onCloseModal() {
    this.props.dispatch(openEditEmp(false));
  }
  submitEditEmp() {
    const selectedEditEmpform = document.forms.editEmpform;
    const empname = selectedEditEmpform.empname.value;
    const empemail = selectedEditEmpform.empemail.value;
    if (empname === '' || empemail === '') {
      alert('both fields are mandatory');
    } else {
      const editEmpData = {
        id: this.props.editEmpData.id,
        name: empname,
        email: empemail,
        companyid: this.props.loggedinUser.companyid,
      };
      this.props.dispatch(editEmp(editEmpData));
      this.onCloseModal();
    }
  }
  render() {
    if (this.props.editEmpPopup === true) {
      return (
        <Modal open={this.props.editEmpPopup} onClose={this.onCloseModal}>
          <div>
            <form name="editEmpform">
              <label htmlFor="empname">Employee Name
                <input type="text" id="empname" name="empname" defaultValue={this.props.editEmpData.name} />
              </label><br />
              <label htmlFor="empemail">Employee E-Mail
                <input type="text" id="empemail" name="empemail" defaultValue={this.props.editEmpData.email} />
              </label><br />
              <div>
                <input type="button" value="Update" onClick={this.submitEditEmp} />
                <input type="button" value="Cancel" onClick={this.onCloseModal} />
              </div>
            </form>
          </div>
        </Modal>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    editEmpPopup: state.empCrudReducer.editEmpPopup,
    editEmpData: state.empCrudReducer.editEmpData,
    loggedinUser: state.loginReducer.loggedinUser,
  };
}

export default connect(mapStateToProps)(EditEmpPopup);
