const mysql = require('mysql2');
const { connection } = require('.');
const db = mysql.createConnection(
    {

        host: "localhost",
        user: "root",
        password: "",
        database: "EmployeeTracker"
    },
    console.log('Connected to the Employee database!')
);

module.exports = db