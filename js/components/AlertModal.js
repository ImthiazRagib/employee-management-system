export default class AlertModalComponent {
  constructor() {
    this.modal = document.createElement("div");
    this.modal.id = "alertModal";
    this.modal.className = "alert-overlay";
    document.body.appendChild(this.modal);
  }

  open({ title = "Alert", message = "", icon = "info", onConfirm, onCancel } = {}) {
    this.modal.innerHTML = `
      <div class="alert-box">
        <div class="alert-header">
          <i id="alertIcon" data-lucide="${icon}"></i>
          <h3 id="alertTitle">${title}</h3>
        </div>

        <p id="alertMessage">${message}</p>

        <div class="alert-actions">
          <button id="alertCancel" class="btn-outline">Cancel</button>
          <button id="alertConfirm" class="btn-primary">OK</button>
        </div>
      </div>
    `;

    this.modal.classList.add("show");

    // Close on overlay click
    this.modal.onclick = (e) => {
      if (e.target === this.modal) {
        this.close();
        if (onCancel) onCancel();
      }
    };

    // Cancel button
    this.modal.querySelector("#alertCancel").onclick = () => {
      this.close();
      if (onCancel) onCancel();
    };

    // Confirm button
    this.modal.querySelector("#alertConfirm").onclick = () => {
      this.close();
      if (onConfirm) onConfirm();
    };
  }

  close() {
    this.modal.classList.remove("show");
    setTimeout(() => (this.modal.innerHTML = ""), 300);
  }
}
