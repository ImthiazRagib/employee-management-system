export const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};


export function exportJSON(data) {
  if (data.length === 0) {
    alert("No data to export.");
    return;
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  downloadBlob(blob, "employees.json");
}

export function exportCSV(data) {
  if (data.length === 0) {
    alert("No data to export.");
    return;
  }
  const headers = ["ID", "Name", "Email", "Department", "Role"];
  const rows = data.map(emp => [
    emp.id,
    emp.fullName,
    emp.email,
    emp.department,
    emp.role
  ]);

  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  downloadBlob(blob, "employees.csv");
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}


export function showLoading() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) overlay.classList.add("show");
}

export function hideLoading() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) overlay.classList.remove("show");
}
