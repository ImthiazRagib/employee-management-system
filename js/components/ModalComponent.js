export default class ModalComponent {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    document.body.appendChild(this.modal);
    this.departments = [
      "Engineering",
      "Human Resources",
      "Sales",
      "Marketing",
      "Finance",
      "Operations",
      "Customer Support",
      "IT",
      "Legal"
    ];
    this.roles = [
      "Manager",
      "Developer",
      "Designer",
      "QA Engineer",
      "HR Specialist",
      "Sales Representative",
      "Product Manager",
      "Data Analyst",
      "Intern"
    ];
  }

  open(onSubmit) {
    const departmentOptions = this.departments
      .map(d => `<option value="${d}">${d}</option>`)
      .join("");
    const roleOptions = this.roles
      .map(r => `<option value="${r}">${r}</option>`)
      .join("");
    this.modal.innerHTML = `
      <div class="modal-content">
        <h2>Add New Employee</h2>
        <form id="employeeForm">
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <select name="department" required>
            <option value="" disabled selected>Select Department</option>
            ${departmentOptions}
          </select>
          <select name="role" required>
            <option value="" disabled selected>Select Role</option>
            ${roleOptions}
          </select>
          <div class="modal-actions">
            <button type="submit" class="save-btn">Save</button>
            <button type="button" class="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    `;

    this.modal.classList.add("show");

    // Close on overlay click
    this.modal.onclick = (e) => {
      if (e.target === this.modal) this.close();
    };

    // Cancel button
    this.modal.querySelector(".cancel-btn").onclick = () => this.close();

    // Submit form
    this.modal.querySelector("#employeeForm").onsubmit = (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      onSubmit(formData); // callback to app
      this.close();
    };
  }

  close() {
    this.modal.classList.remove("show");
    setTimeout(() => (this.modal.innerHTML = ""), 300);
  }
}
