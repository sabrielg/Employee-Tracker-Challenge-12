const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const DB = require('./db/index.js')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

function start () {

}

function mainQuestions() {
    prompt([
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
                    name:"Add a Department",
                    value:"add_department"
                },
                {
                    name:"Add a Role",
                    value:"add_role"
                },
                {
                    name:"Add an Employee",
                    value:"add_employee"
                },
                {
                    name:"Update Employee Role",
                    value:"update_role"
                }
                // more curly brackets with name and value for all options
            ]
        }
    ]).then (res => {
        const option = res.option
        switch(option) {
            // view dept, view roles, etc.
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
        }
    });
}

function viewEmployees () {
    DB.findAllEmployees ().then(([rows]) => {
        let employees = rows
        console.table(employees)
    })
} 


function addDepartment() {
    prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ])
      .then(res => {
        let name = res;
        db.createDepartment(name)
          .then(() => console.log(`Added ${name.name} to the database`))
          .then(() => loadMainPrompts())
      })
  }
