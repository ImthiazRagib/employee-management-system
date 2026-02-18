export default class PaginationComponent {
  constructor(container, onPageChange) {
    this.container = container;
    this.onPageChange = onPageChange;
  }

  render(totalItems, currentPage, perPage) {
    const totalPages = Math.ceil(totalItems / perPage);

    this.container.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;

      if (i === currentPage) {
        btn.classList.add('active');
      }

      btn.addEventListener('click', () => {
        this.onPageChange(i);
      });

      this.container.appendChild(btn);
    }
  }
}
