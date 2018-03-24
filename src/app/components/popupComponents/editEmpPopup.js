import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { openEditEmp, editEmp } from '../../actions/empCrudActions';

class EditEmpPopup extends Component {
  constructor() {
    super();
    this.state = {
      managerOptions: null,
      selectedOption: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.submitEditEmp = this.submitEditEmp.bind(this);
  }
  componentWillMount() {
    const options = [];
    let optionObj = {};
    this.props.fetchedEmployees.map((empdata) => {
      optionObj = {};
      optionObj.value = empdata.id;
      optionObj.label = empdata.name;
      options.push(optionObj);
      return null;
    });
    this.setState({ managerOptions: options });
  }
  onCloseModal() {
    this.props.dispatch(openEditEmp(false));
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }
  submitEditEmp() {
    const selectedEditEmpform = document.forms.editEmpform;
    const empname = selectedEditEmpform.empname.value;
    const empemail = selectedEditEmpform.empemail.value;
    const empManager = this.state.selectedOption.value;
    if (empname === '' || empemail === '' || empManager === '') {
      alert('both fields are mandatory');
    } else {
      const editEmpData = {
        id: this.props.editEmpData.id,
        name: empname,
        email: empemail,
        resourceManager: empManager,
        companyid: this.props.loggedinUser.companyid,
      };
      this.props.dispatch(editEmp(editEmpData));
      this.onCloseModal();
    }
  }
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
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
                <label htmlFor="empManagername">Employee Manager
                <Select
                  name="resource-manager-name"
                  id="empManagername"
                  value={value}
                  onChange={this.handleChange}
                  options={this.state.managerOptions}
                />
                </label>
              </div>
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
    fetchedEmployees: state.empCrudReducer.fetchedEmployees,
  };
}

export default connect(mapStateToProps)(EditEmpPopup);
