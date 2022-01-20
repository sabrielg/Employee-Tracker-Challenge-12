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

            // case "view_employees":
            //     viewEmployees()
            //     break;

            // case "view_employees":
            //     viewEmployees()
            //     break;
        }
    });
}

function viewEmployees () {
    DB.findAllEmployees ().then(([rows]) => {
        let employees = rows
        console.table(employees)
    })
} 
