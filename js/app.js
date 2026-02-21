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



const table = new TableComponent(document.getElementById('table-container'), handleDelete);
const pagination = new PaginationComponent(
  document.getElementById('pagination-container'),
  handlePageChange
);

const exportBtn = document.getElementById("exportCSV");
const jsonExportBtn = document.getElementById("exportJSON");

let currentPage = 1;
const perPage = 5;
let filteredData = [];

async function init() {
  //* Load initial data
  showLoading();
  const employees = await dataService.getEmployees();
  hideLoading();
  collection.setEmployees(employees);
  filteredData = employees;
  render();
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


// Add Employee
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
      filteredData = collection.search(searchInput.value || "");
      
      //* Re-render table & pagination
      render();
    }
  });
}


//* Search Filter
function handleSearch(query) {
  currentPage = 1;
  filteredData = collection.search(query);
  render();
}
const search = new SearchComponent(
  document.getElementById('search-container'),
  debounce(handleSearch, 300)
);

search.render();
init();