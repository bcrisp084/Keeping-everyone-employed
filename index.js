const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password123$",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    getStarted()
})

const getStarted = () => 
inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'Please decide how you would like to proceed.',
        loop: false,
        choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Delete a Department",
        "Delete a Role",
        "Delete an Employee",
        "View employees by manager",
        "Update employee's role",
        "Update employee's manager",
        "View the total utilized budget of a department",
        ]
    },
]);