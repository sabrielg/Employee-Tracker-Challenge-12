
const DB = require('./db/index.js')

const inquirer = require("inquirer");
const db = require('./db/connection.js');


function mainQuestions() {
    inquirer.prompt([
        {
            type: "list", 
            name: "option",
            message: "What would you like to do?",
            choices: [
                {
                    name:"View all employees",
                    value:"view_employees"
                },
                {
                    name:"View all departments",
                value: "view_departments"
            },
                {
                    name:"Add a Department",
                    value:"add_department"
                },
                {
                    name:"Add a Role",
                    value:"add_role"
                },
                {
                    name:"View all roles",
                    value:"view_roles"
                },
                {
                    name:"Add an Employee",
                    value:"add_employee"
                },
                {
                    name:"Update Employee Role",
                    value:"update_role"
                }
            ]
        }
    ]).then (res => {
        const option = res.option
        switch(option) {
            case "view_employees":
                viewEmployees()
                break;

            case "view_departments":
                viewDepartments()
                break;

            case "view_roles":
                viewRoles()
                break;

            case "add_department":
                    addDepartment()
                    break;

            case "add_role":
                        addRole()
                        break;

            case "add_employee":
                            addEmployee()
                            break;

            case "update_role":
                updateEmployeeRole()
                break;
        }
    });
}

function viewEmployees () {
    DB.findAllEmployees ().then(([rows]) => {
        let employees = rows
        console.table(employees)
        mainQuestions()
    })
} 

function viewRoles () {
    DB.findAllRoles ().then(([rows]) => {
        let roles = rows
        console.table(roles)
        mainQuestions()
    })
} 

function viewDepartments () {
    DB.findAllDept ().then(([rows]) => {
        let department = rows
        console.table(department)
        mainQuestions()
    })
} 


function addDepartment() {

    inquirer.prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ])
      .then(res => {
        let name = res;
        DB.addDept(name)
          .then(() => console.table(`Added ${name.name} to the database`))
          .then(() => mainQuestions())
      })
  }

  async function addRole() {

    const departments = await db.promise().query('SELECT * FROM department');
    const departmentMap = await departments[0].map(({id, name}) => ({
        name: name, 
        value: id
    }));

      inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the name of the role?"
      },
      {
          name: "salary",
          type: "input",
          message: "What is the salary?",
      },
      {
          name: "department_id",
          type: "list",
          choices: departmentMap,
          message: "What department would you like to add the role to?"
      }
    ])
      .then(res => {
          console.table(res);
        DB.addRole(res)
          .then(() => console.table(`Added ${res.title} to the database`))
          .then(() => mainQuestions())
      })
  }

  async function addEmployee() {
      const managers = await DB.getManagers()
      console.table(managers [0] )
    const managerMap = await managers[0].map(({ id, first_name, last_name, })=> ( {
        name: `${first_name} ${last_name}`,
        value: id
    }))
    managerMap.unshift({
        name: "none",
    value: null
    })

    inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the first name of the employee?"
    },
    {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee?",
    },
    {
        name: "role_id",
        type: "input",
        message: "What is the role ID of the employee?"
    },
    {
        name: "manager_id",
        type: "list",
        message: "Please select the manager for the employee.",
        choices: managerMap
    },
  ])
    .then(res => {
        console.table(res);
      DB.addEmployee(res)
        .then(() => console.table(`Added ${res.first_name} ${res.last_name} to the database`))
        .then(() => mainQuestions())
    })
}

// function updateEmployeeRole() {
//     inquirer.prompt( [
//         {
//             name: "id",
//             type:"input",
//             message: "What is the employee's id?"
//     },
//     {
//         name: "role_id",
//         type: 'input',
//         message:"What is the employee's new role id?"
//     }
//     ])
//     .then(res => {
//         DB.updateEmployeeRole(res.role_id,res.id)
//     })
//     .then(() => mainQuestions())
// }

async function updateEmployeeRole () {
    const employees = await db.promise().query(`SELECT * FROM employee`);
    const employeesMap = await employees[0].map(({id, first_name, last_name, role_id, manager_id}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }))

    const roles = await db.promise().query(`SELECT * FROM role`);
    const rolesMap = await roles[0].map(({id, title, salary, department_id}) => ({
        name: title,
        value: id
    }))

    const employeeData = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Which employee would you like to edit?',
            choices: employeesMap
        },
        {
            type: 'list',
            name:'role_id',
            message: 'What is their new role?',
            choices: rolesMap
        }
    ])
    await db.promise().query(`UPDATE employee SET role_id = ${employeeData.role_id} WHERE id= ${employeeData.id}`);
    mainQuestions();
}

  mainQuestions();