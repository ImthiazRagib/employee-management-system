export default class TableComponent {
  constructor(container, onDelete) {
    this.container = container;
    this.onDelete = onDelete; // callback when delete is requested
  }
  render(employees) {
    // Build filter controls
    const depts = [...new Set(employees.map(e => e.department))].sort();
    const roles = [...new Set(employees.map(e => e.role))].sort();

    const deptOptions = depts.map(d => `<option value="${d}">${d}</option>`).join('');
    const roleOptions = roles.map(r => `<option value="${r}">${r}</option>`).join('');

    const departmentDropdown = document.getElementById("departmentFilter");
    departmentDropdown.innerHTML = '<option value="">All Departments</option>' + deptOptions;

    const roleDropdown = document.getElementById("roleFilter");
    roleDropdown.innerHTML = '<option value="">All Roles</option>' + roleOptions;

    if (!employees || employees.length === 0) {
      this.container.innerHTML = `
        <div class="no-data-found">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 3h18v18H3zM3 9h18M9 21V9"></path>
          </svg>
          <p>No data found</p>
        </div>
      `;
      return;
    }

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
                <button class="delete-btn" data-id="${emp.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
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
