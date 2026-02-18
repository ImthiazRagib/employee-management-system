export default class TableComponent {
  constructor(container, onDelete) {
    this.container = container;
    this.onDelete = onDelete; // callback when delete is requested
  }

  render(employees) {
    this.container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${employees.map(emp => `
            <tr>
              <td data-label="ID">${emp.id}</td>
              <td data-label="Name">${emp.fullName}</td>
              <td data-label="Email">${emp.email}</td>
              <td data-label="Department">${emp.department}</td>
              <td data-label="Role">${emp.role}</td>
              <td data-label="Actions">
                <button class="delete-btn" data-id="${emp.id}">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    // Attach delete handlers
    this.container.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        this.onDelete(id); // trigger callback to app
      });
    });
  }
}
