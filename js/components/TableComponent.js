export default class TableComponent {
  constructor(container) {
    this.container = container;
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
          </tr>
        </thead>
        <tbody>
          ${employees.map(emp => `
            <tr>
              <td>${emp.id}</td>
              <td>${emp.fullName}</td>
              <td>${emp.email}</td>
              <td>${emp.department}</td>
              <td>${emp.role}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}
