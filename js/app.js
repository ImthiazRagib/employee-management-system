import EmployeeAPI from './api/EmployeeApi';
import ModalComponent from './components/ModalComponent';
import PaginationComponent from './components/PaginationComponents';
import SearchComponent from './components/SearchComponent';
import TableComponent from './components/TableComponent';
import EmployeeCollection from './models/EmployeeCollection';
import DataService from './services/DataService';
import { debounce, exportCSV, exportJSON } from './utils/helpers';

const api = new EmployeeAPI('https://dummyjson.com/users');
const dataService = new DataService(api);
const collection = new EmployeeCollection();

const table = new TableComponent(document.getElementById('table-container'), handleDelete);
const pagination = new PaginationComponent(
  document.getElementById('pagination-container'),
  handlePageChange
);

let currentPage = 1;
const perPage = 5;
let filteredData = [];

async function init() {
  const employees = await dataService.getEmployees();
  collection.setEmployees(employees);
  filteredData = employees;
  render();
}

function render() {
  const paginated = collection.paginate(filteredData, currentPage, perPage);
  table.render(paginated);
  pagination.render(filteredData.length, currentPage, perPage);
}

// Export buttons
document.getElementById("exportCSV").onclick = () =>
  exportCSV(collection.employees);

document.getElementById("exportJSON").onclick = () =>
  exportJSON(collection.employees); 


// Add button
const modal = new ModalComponent();

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

function handleSearch(query) {
  currentPage = 1;
  filteredData = collection.search(query);
  render();
}

function handlePageChange(page) {
  currentPage = page;
  render();
}

const search = new SearchComponent(
  document.getElementById('search-container'),
  debounce(handleSearch, 300)
);

// Delete
function handleDelete(id) {
  // 1️⃣ Show confirmation
  const confirmed = confirm("Are you sure you want to delete this employee?");
  if (!confirmed) return;

  // 2️⃣ Update the model
  collection.deleteById(id);

  // 3️⃣ Update filtered data (maintains search/filter)
  filteredData = collection.search(searchInput.value || "");
  
  // 4️⃣ Re-render table & pagination
  render();
}

search.render();
init();