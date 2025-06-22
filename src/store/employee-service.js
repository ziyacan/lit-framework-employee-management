class EmployeeService {
    constructor() {
        this.employees = JSON.parse(localStorage.getItem("employees")) || [
            {
                id: 1,
                firstName: "Johnny",
                lastName: "Doe",
                dateOfEmployment: "2022-01-15",
                dateOfBirth: "1990-05-20",
                phone: "123-456-7890",
                email: "john.doe@example.com",
                department: "Tech",
                position: "Senior",
            },
            {
                id: 2,
                firstName: "Ziyacannn",
                lastName: "Can",
                dateOfEmployment: "2025-06-21",
                dateOfBirth: "2016-02-03",
                phone: "1313123123123",
                email: "dsadad@sada.com",
                department: "Sales",
                position: "Manager",
            },
            {
                id: 3,
                firstName: "Jack",
                lastName: "Davis",
                dateOfEmployment: "2023-09-01",
                dateOfBirth: "2020-12-15",
                phone: "370-794-6687",
                email: "jack.davis@example.com",
                department: "Analytics",
                position: "Lead",
            },
            {
                id: 4,
                firstName: "Frank",
                lastName: "Smith",
                dateOfEmployment: "2020-10-22",
                dateOfBirth: "1999-03-20",
                phone: "841-574-1855",
                email: "frank.smith@example.com",
                department: "Tech",
                position: "Mid",
            },
            {
                id: 5,
                firstName: "Hank",
                lastName: "Smith",
                dateOfEmployment: "2016-12-07",
                dateOfBirth: "1977-04-29",
                phone: "947-413-6725",
                email: "hank.smith@example.com",
                department: "Analytics",
                position: "Mid",
            },
            {
                id: 6,
                firstName: "Quinn",
                lastName: "Brown",
                dateOfEmployment: "2016-06-21",
                dateOfBirth: "1992-03-23",
                phone: "166-110-3036",
                email: "quinn.brown@example.com",
                department: "Analytics",
                position: "Manager",
            },
            {
                id: 7,
                firstName: "Quinn",
                lastName: "Williams",
                dateOfEmployment: "2015-02-27",
                dateOfBirth: "1993-09-28",
                phone: "854-286-5652",
                email: "quinn.williams@example.com",
                department: "Tech",
                position: "Senior",
            },
            {
                id: 8,
                firstName: "Grace",
                lastName: "Miller",
                dateOfEmployment: "2017-11-23",
                dateOfBirth: "1977-01-21",
                phone: "394-235-9329",
                email: "grace.miller@example.com",
                department: "Analytics",
                position: "Lead",
            },
            {
                id: 9,
                firstName: "Ivy",
                lastName: "Gonzalez",
                dateOfEmployment: "2015-11-29",
                dateOfBirth: "2003-01-24",
                phone: "265-587-2667",
                email: "ivy.gonzalez@example.com",
                department: "Tech",
                position: "Mid",
            },
            {
                id: 10,
                firstName: "Paul",
                lastName: "Brown",
                dateOfEmployment: "2016-02-24",
                dateOfBirth: "1999-01-22",
                phone: "613-334-9040",
                email: "paul.brown@example.com",
                department: "Tech",
                position: "Manager",
            },
            {
                id: 11,
                firstName: "Nina",
                lastName: "Gonzalez",
                dateOfEmployment: "2019-04-25",
                dateOfBirth: "1986-10-01",
                phone: "458-815-5871",
                email: "nina.gonzalez@example.com",
                department: "Sales",
                position: "Senior",
            },
            {
                id: 12,
                firstName: "Mona",
                lastName: "Smith",
                dateOfEmployment: "2022-05-04",
                dateOfBirth: "2002-11-02",
                phone: "359-846-2826",
                email: "mona.smith@example.com",
                department: "Analytics",
                position: "Lead",
            },
            {
                id: 13,
                firstName: "Liam",
                lastName: "Johnson",
                dateOfEmployment: "2023-06-27",
                dateOfBirth: "1980-02-20",
                phone: "923-301-7732",
                email: "liam.johnson@example.com",
                department: "Tech",
                position: "Lead",
            },
            {
                id: 14,
                firstName: "Kara",
                lastName: "Garcia",
                dateOfEmployment: "2018-04-15",
                dateOfBirth: "2015-04-15",
                phone: "982-225-6113",
                email: "kara.garcia@example.com",
                department: "Analytics",
                position: "Manager",
            },
            {
                id: 15,
                firstName: "Paul",
                lastName: "Smith",
                dateOfEmployment: "2017-09-14",
                dateOfBirth: "1994-03-17",
                phone: "870-632-9536",
                email: "paul.smith@example.com",
                department: "Sales",
                position: "Manager",
            },
            {
                id: 16,
                firstName: "Ivy",
                lastName: "Miller",
                dateOfEmployment: "2020-03-02",
                dateOfBirth: "1981-01-25",
                phone: "606-626-1734",
                email: "ivy.miller@example.com",
                department: "Tech",
                position: "Junior",
            },
            {
                id: 17,
                firstName: "Hank",
                lastName: "Brown",
                dateOfEmployment: "2018-12-17",
                dateOfBirth: "1980-06-21",
                phone: "343-600-6950",
                email: "hank.brown@example.com",
                department: "Analytics",
                position: "Mid",
            },
            {
                id: 18,
                firstName: "Oscar",
                lastName: "Smith",
                dateOfEmployment: "2018-06-22",
                dateOfBirth: "2013-01-08",
                phone: "483-128-2588",
                email: "oscar.smith@example.com",
                department: "Analytics",
                position: "Lead",
            },
            {
                id: 19,
                firstName: "Eve",
                lastName: "Gonzalez",
                dateOfEmployment: "2016-05-03",
                dateOfBirth: "2004-08-13",
                phone: "404-335-3943",
                email: "eve.gonzalez@example.com",
                department: "Analytics",
                position: "Junior",
            },
            {
                id: 20,
                firstName: "Oscar",
                lastName: "Jones",
                dateOfEmployment: "2017-06-14",
                dateOfBirth: "1981-12-12",
                phone: "369-726-6942",
                email: "oscar.jones@example.com",
                department: "Sales",
                position: "Senior",
            },
        ];
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem("employees", JSON.stringify(this.employees));
    }

    getEmployees() {
        return this.employees;
    }

    getEmployee(id) {
        return this.employees.find((emp) => emp.id === id);
    }

    addEmployee(employee) {
        const newId =
            this.employees.length > 0
                ? Math.max(...this.employees.map((e) => e.id)) + 1
                : 1;
        const newEmployee = { ...employee, id: newId };
        this.employees.push(newEmployee);
        this.saveToLocalStorage();
        return newEmployee;
    }

    updateEmployee(updatedEmployee) {
        const index = this.employees.findIndex(
            (emp) => emp.id === updatedEmployee.id
        );
        if (index !== -1) {
            this.employees[index] = updatedEmployee;
            this.saveToLocalStorage();
            return updatedEmployee;
        }
        return null;
    }

    deleteEmployee(id) {
        const index = this.employees.findIndex((emp) => emp.id === id);
        if (index !== -1) {
            this.employees.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }
}

export const employeeService = new EmployeeService();
