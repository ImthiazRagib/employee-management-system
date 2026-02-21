import EmployeeAPI from './api/EmployeeApi';
import AlertModalComponent from './components/AlertModal';
import ModalComponent from './components/ModalComponent';
import PaginationComponent from './components/PaginationComponents';
import SearchComponent from './components/SearchComponent';
import TableComponent from './components/TableComponent';
import Employee from './models/Employee';
import EmployeeCollection from './models/EmployeeCollection';
import DataService from './services/DataService';
import { debounce, exportCSV, exportJSON, hideLoading, showLoading } from './utils/helpers';

const api = new EmployeeAPI('https://dummyjson.com/users');
const dataService = new DataService(api);
const collection = new EmployeeCollection();
const modal = new ModalComponent();
const alertModal = new AlertModalComponent();

//* DOMs
const departmentFilter = document.getElementById("departmentFilter");
const roleFilter = document.getElementById("roleFilter");
const exportBtn = document.getElementById("exportCSV");
const jsonExportBtn = document.getElementById("exportJSON");
const tableContainer = document.getElementById('table-container');
const paginationContainer = document.getElementById('pagination-container');
const searchContainer = document.getElementById('search-container');

const table = new TableComponent(tableContainer, handleDelete);
const pagination = new PaginationComponent(
  paginationContainer,
  handlePageChange
);

let currentPage = 1;
const perPage = 5;
let filteredData = [];

const setFilterDropdowns = (employees) => {
  // Build filter controls
  const depts = [...new Set(employees.map(e => e.department))].sort();
  const roles = [...new Set(employees.map(e => e.role))].sort();

  const deptOptions = depts.map(d => `<option value="${d}">${d}</option>`).join('');
  const roleOptions = roles.map(r => `<option value="${r}">${r}</option>`).join('');

  departmentFilter.innerHTML = '<option value="">All Departments</option>' + deptOptions;
  roleFilter.innerHTML = '<option value="">All Roles</option>' + roleOptions;

  modal.setDepartmentOptions(depts);
  modal.setRoleOptions(roles);
}

async function init() {
  //* Load initial data
  showLoading();
  const employees = await dataService.getEmployees();
  collection.setEmployees(employees);
  filteredData = employees;
  setFilterDropdowns(employees);
  hideLoading();
  render();


  // UI Updates
  lucide.createIcons();
}

function render() {
  //* Paginate filtered data
  const paginated = collection.paginate(filteredData, currentPage, perPage);
  table.render(paginated);
  pagination.render(filteredData.length, currentPage, perPage);

  //* Disable/enable export buttons based on data count
  const hasData = filteredData.length > 0;
  exportBtn.disabled = !hasData;
  jsonExportBtn.disabled = !hasData;
}

//* Export buttons
//* Export filtered data
exportBtn.onclick = () =>
  exportCSV(filteredData);

jsonExportBtn.onclick = () =>
  exportJSON(filteredData);


//* Add button
document.getElementById("addBtn").onclick = () => {
  modal.open((data) => {
    const newEmployee = new Employee({
      id: Date.now(),
      ...data
    });
    collection.add(newEmployee);
    filteredData = collection.employees;
    render();
  });
};

function handlePageChange(page) {
  currentPage = page;
  render();
}


//* Add Employee
document.getElementById("addBtn").onclick = () => {
  modal.open((data) => {
    // Create Employee instance
    const newEmployee = new Employee({
      id: Date.now(), // unique ID
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      department: data.department,
      role: data.role
    });

    // Add to collection
    collection.add(newEmployee);

    // Refresh filtered data and table
    filteredData = collection.employees;
    currentPage = 1;
    render();
  });
};

//* Delete Employee
function handleDelete(id) {
  //* Show confirmation
  alertModal.open({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this employee?',
    onConfirm: () => {
      //* Update the model
      collection.deleteById(id);

      //* Update filtered data (maintains search/filter)
      filteredData = collection.filter({ ...collection.getFilters() });

      //* Re-render table & pagination
      render();
    }
  });
}


//* Search Filter
function handleSearch(filters) {
  currentPage = 1;
  filteredData = collection.filter({ ...collection.getFilters(), query: filters.query || '' });
  render();
}
const search = new SearchComponent(
  searchContainer,
  debounce((filters) => handleSearch(filters), 300),
  collection.getFilters()
);

//* Dropdown Filters
departmentFilter.onchange = () => {
  currentPage = 1;
  filteredData = collection.filter({
    ...collection.getFilters(),
    department: departmentFilter.value || undefined,
    role: roleFilter.value || undefined
  });
  render();
};

roleFilter.onchange = () => {
  currentPage = 1;
  filteredData = collection.filter({
    ...collection.getFilters(),
    department: departmentFilter.value || undefined,
    role: roleFilter.value || undefined
  });
  render();
};

search.render();
init();