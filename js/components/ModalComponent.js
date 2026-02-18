export default class ModalComponent {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.className = "modal hidden";
    document.body.appendChild(this.modal);
  }

  open(onSubmit) {
    this.modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <h2>Add Employee</h2>
        <form id="employeeForm">
          <input required name="firstName" placeholder="First Name" />
          <input required name="lastName" placeholder="Last Name" />
          <input required name="email" placeholder="Email" />
          <input required name="department" placeholder="Department" />
          <input required name="role" placeholder="Role" />
          <div class="modal-actions">
            <button type="submit">Save</button>
            <button type="button" id="cancelBtn">Cancel</button>
          </div>
        </form>
      </div>
    `;

    this.modal.classList.remove("hidden");

    this.modal.querySelector("#employeeForm").onsubmit = (e) => {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.target));
      onSubmit(formData);
      this.close();
    };

    this.modal.querySelector("#cancelBtn").onclick = () => this.close();
  }

  close() {
    this.modal.classList.add("hidden");
  }
}
