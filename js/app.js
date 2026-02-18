import EmployeeAPI from './api/EmployeeApi';
import ModalComponent from './components/ModalComponent';
import PaginationComponent from './components/PaginationComponents';
import SearchComponent from './components/SearchComponent';
import TableComponent from './components/TableComponent';
import EmployeeCollection from './models/EmployeeCollection';
import DataService from './services/DataService';
import { debounce } from './utils/helpers';

const api = new EmployeeAPI('https://dummyjson.com/users');
const dataService = new DataService(api);
const collection = new EmployeeCollection();

const table = new TableComponent(document.getElementById('table-container'));
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

search.render();
init();