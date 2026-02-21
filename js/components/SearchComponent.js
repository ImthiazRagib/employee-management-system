export default class SearchComponent {
  constructor(container, onSearch, filters) {
    this.container = container;
    this.onSearch = onSearch;
    this.filters = filters || null;
  }
  
  render() {    
    this.container.innerHTML = `
    <input class="search-input" type="text" placeholder="Search employee by name, email & role..." id="searchInput" />
    `;
    
    const input = this.container.querySelector('#searchInput');
    
    input.addEventListener('input', (e) => {
      this.onSearch({ ...this.filters, query: e.target.value });
    });
  }
}
