import { EmployeeActions } from '../actions/actionTypes';

const initialState = {
  fetchedEmployees: null,
  addEmpPopup: null,
  editEmpPopup: null,
  editEmpData: null,
};

export default function empCrudReducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case 'ErrorType.ERROR_LOG': {
      st = { ...state, message: action.message };
      break;
    }
    case EmployeeActions.FETCH_EPLOYEES: {
      st = { ...state, fetchedEmployees: action.payload };
      break;
    }
    case EmployeeActions.ADD_NEW_EMP_POPUP: {
      st = { ...state, addEmpPopup: action.payload };
      break;
    }
    case EmployeeActions.ADD_NEW_EMP: {
      const empData = [];
      st.fetchedEmployees.map((emps) => {
        empData.push(emps);
        return null;
      });
      empData.push(action.payload);
      st = { ...state, fetchedEmployees: empData };
      break;
    }
    case EmployeeActions.EDIT_EMP_POPUP: {
      st = { ...state, editEmpPopup: action.bool, editEmpData: action.payload };
      break;
    }
    case EmployeeActions.UPDATE_EMP: {
      const empData = [];
      st.fetchedEmployees.map((emp) => {
        if (emp.id === action.payload.id) {
          // do nothing
        } else {
          empData.push(emp);
        }
        return null;
      });
      empData.push(action.payload);
      st = { ...state, fetchedEmployees: empData };
      break;
    }
    case EmployeeActions.DEL_EMP: {
      const empData = [];
      st.fetchedEmployees.map((emp) => {
        if (action.payload.id === emp.id) {
          // do nothing
        } else {
          empData.push(emp);
        }
        return null;
      });
      st = { ...state, fetchedEmployees: empData };
      break;
    }
    default: {
      return st;
    }
  }
  console.log(`AFTER::${action.type},${JSON.stringify(st)}`);
  return st;
}
