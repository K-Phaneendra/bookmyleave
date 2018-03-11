const API_URL = 'http://localhost:1212/';

function getUrl(pattern) {
  return `${API_URL}${pattern}`;
}

export const EmployeesUrls = {
  // EMPLOYEE_API: getUrl('employees'),
  EMPLOYEE_REGISTERED: getUrl('employees/registeredAdmin'),
  CHECK_LOGIN: getUrl('employees/login'),
  FETCH_EMPLOYEES: getUrl('employees/companyid'),
};

export const RegistrationURLs = {
  // COMPANIES_API: getUrl('companies'),
  CHECK_REGISTERED_COMP: getUrl('companies/registeredCompany'),
};
