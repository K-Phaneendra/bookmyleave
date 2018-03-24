import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { openAddEmp, addNewEmp } from '../../actions/empCrudActions';

class AddEmpPopup extends Component {
  constructor() {
    super();
    this.state = {
      managerOptions: null,
      selectedOption: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.submitAddEmp = this.submitAddEmp.bind(this);
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
    this.props.dispatch(openAddEmp(false));
  }
  handleChange(selectedOption) {
    this.setState({ selectedOption });
  }
  submitAddEmp() {
    const selectedAddEmpform = document.forms.addEmpform;
    const empname = selectedAddEmpform.empname.value;
    const empcode = selectedAddEmpform.empcode.value;
    const empemail = selectedAddEmpform.empemail.value;
    const emppass = selectedAddEmpform.emppass.value;
    const empManager = this.state.selectedOption.value;
    if (empname === '' || empcode === '' || empemail === '' || emppass === '' || empManager === '') {
      alert('all fields are mandatory');
    } else {
      const addEmp = {
        name: empname,
        code: empcode,
        email: empemail,
        password: emppass,
        resourceManager: empManager,
        companyid: this.props.loggedinUser.companyid,
      };
      this.props.dispatch(addNewEmp(addEmp));
      this.onCloseModal();
    }
  }
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
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
    fetchedEmployees: state.empCrudReducer.fetchedEmployees,
  };
}

export default connect(mapStateToProps)(AddEmpPopup);
