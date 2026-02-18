export default class SearchComponent {
  constructor(container, onSearch) {
    this.container = container;
    this.onSearch = onSearch;
  }

  render() {
    this.container.innerHTML = `
      <input class="search-input" type="text" placeholder="Search employee by name, email & role..." id="searchInput" />
    `;

    const input = this.container.querySelector('#searchInput');

    input.addEventListener('input', (e) => {
      this.onSearch(e.target.value);
    });
  }
}
