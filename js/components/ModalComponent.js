export default class ModalComponent {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = "modal";
    document.body.appendChild(this.modal);
  }

  open(onSubmit) {
    this.modal.innerHTML = `
      <div class="modal-content">
        <h2>Add New Employee</h2>
        <form id="employeeForm">
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="department" placeholder="Department" required />
          <input type="text" name="role" placeholder="Role" required />
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
