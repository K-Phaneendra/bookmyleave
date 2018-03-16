import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { openAddEmp, addNewEmp } from '../../../actions/empCrudActions';

class AddEmpPopup extends Component {
  constructor() {
    super();
    this.onCloseModal = this.onCloseModal.bind(this);
    this.submitAddEmp = this.submitAddEmp.bind(this);
  }
  onCloseModal() {
    this.props.dispatch(openAddEmp(false));
  }
  submitAddEmp() {
    const selectedAddEmpform = document.forms.addEmpform;
    const empname = selectedAddEmpform.empname.value;
    const empcode = selectedAddEmpform.empcode.value;
    const empemail = selectedAddEmpform.empemail.value;
    const emppass = selectedAddEmpform.emppass.value;
    if (empname === '' || empcode === '' || empemail === '' || emppass === '') {
      alert('all fields are mandatory');
    } else {
      const addEmp = {
        name: empname,
        code: empcode,
        email: empemail,
        password: emppass,
        companyid: this.props.loggedinUser.companyid,
      };
      this.props.dispatch(addNewEmp(addEmp));
      this.onCloseModal();
    }
  }
  render() {
    return (
      <Modal open={this.props.addEmpPopup} onClose={this.onCloseModal}>
        <div>
          <form name="addEmpform">
            <label htmlFor="empname">Employee Name
              <input type="text" id="empname" name="empname" />
            </label><br />
            <label htmlFor="empcode">Employee Code
              <input type="text" id="empcode" name="empcode" />
            </label><br />
            <label htmlFor="empemail">Employee E-Mail
              <input type="text" id="empemail" name="empemail" />
            </label><br />
            <label htmlFor="emppass">Employee Password
              <input type="password" id="emppass" name="emppass" />
            </label><br />
            <div>
              <input type="button" value="Add" onClick={this.submitAddEmp} />
              <input type="button" value="Cancel" onClick={this.onCloseModal} />
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    addEmpPopup: state.empCrudReducer.addEmpPopup,
    loggedinUser: state.loginReducer.loggedinUser,
  };
}

export default connect(mapStateToProps)(AddEmpPopup);
