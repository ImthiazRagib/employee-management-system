export default class EmployeeCollection {
    constructor(employees = []) {
        this.employees = employees;
    }

    setEmployees(employees) {
        this.employees = employees;
    }

    add(employee) {
        this.employees.push(employee);
    }

    deleteById(id) {
        this.employees = this.employees.filter(emp => emp.id !== id);
    }


    search(query) {
        if (!query) return this.employees;

        // Search by full name, email, department, and role
        return this.employees.filter(emp =>
            emp.fullName.toLowerCase().includes(query.toLowerCase()) ||
            emp.email.toLowerCase().includes(query.toLowerCase()) ||
            //   emp.department.toLowerCase().includes(query.toLowerCase()) ||
            emp.role.toLowerCase().includes(query.toLowerCase())
        );
    }

    paginate(data, page = 1, perPage = 5) {
        const start = (page - 1) * perPage;
        return data.slice(start, start + perPage);
    }

    get total() {
        return this.employees.length;
    }
}
