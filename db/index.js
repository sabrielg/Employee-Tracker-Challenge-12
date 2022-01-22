const connection = require("./connection");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }
  findAllRoles() {
      return this.connection.promise().query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id; "
      );
  }
  findAllDept() {
      return this.connection.promise().query(
          "SELECT department.id, department.name FROM department;"
      );
  }
  addDept(department) {
      return this.connection.promise().query(
          "INSERT INTO department SET ?", department
      );
  }
  addRole(role) {
      console.log(role);
    return this.connection.promise().query(
        "INSERT INTO role SET ?", role
    );
}
addEmployee(employee) {
    return this.connection.promise().query(
        "INSERT INTO employee SET ?", employee
    );
}

getManagers() {
    return this.connection.promise().query(
        "SELECT * FROM employee WHERE manager_id IS null",
    );
}
updateEmployeeRole (role_id, id) {
    return this.connection.promise().query(
        "UPDATE employee SET role_id =? WHERE id = ?", [role_id, id]
    );
}
}

module.exports = new DB(connection);