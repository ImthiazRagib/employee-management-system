export default class EmployeeCollection {
    constructor(employees = []) {
        this.employees = employees;
        this.filters = { query: "", department: "", role: "" };
    }

    setEmployees(employees) {
        this.employees = employees;
    }

    add(employee) {
        this.employees.unshift(employee);
    }

    deleteById(id) {
        this.employees = this.employees.filter(emp => emp.id !== id);
    }


    filter({ query, department, role }) {
        let result = this.employees;

        // Filter by department if provided
        if (department) {
            result = result.filter(emp => emp.department === department);
        }

        // Filter by role if provided
        if (role) {
            result = result.filter(emp => emp.role === role);
        }

        // Search by full name, email, department, and role if query provided
        if (query) {
            const lowerQuery = query.toLowerCase();
            result = result.filter(emp =>
                emp.fullName.toLowerCase().includes(lowerQuery) ||
                emp.email.toLowerCase().includes(lowerQuery) ||
                emp.role.toLowerCase().includes(lowerQuery)
            );
        }

        this.filters = { query, department, role };
        return result;
    }

    paginate(data, page = 1, perPage = 5) {
        const start = (page - 1) * perPage;
        return data.slice(start, start + perPage);
    }

    get total() {
        return this.employees.length;
    }

    getFilters() {
        return this.filters;
    }
}
