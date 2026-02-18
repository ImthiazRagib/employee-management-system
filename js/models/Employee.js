export default class Employee {
  constructor({ id, firstName, lastName, email, department, role }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department || "General";
    this.role = role || "Employee";
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
