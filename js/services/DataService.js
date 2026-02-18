import Employee from '../models/Employee.js';

export default class DataService {
    constructor(api) {
        this.api = api;
    }

    async getEmployees() {
        const data = await this.api.fetchEmployees();

        return data.users.map(user => new Employee({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            department: user.company?.department,
            role: user.company?.title
        }));
    }

}
