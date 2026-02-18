export default class EmployeeAPI {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetchEmployees() {
    const response = await fetch(this.baseURL);

    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }

    return await response.json();
  }
}
