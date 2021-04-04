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
    mainMenu();
})

const getStarted = [
    {
        type: 'list',
        name: 'action',
        message: 'Please choose one of the following.',
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
        "Update Employee's Role",
        "View the total utilized budget of a department",
        "Exit"
        ]
    },
];

function mainMenu() {
    inquirer.prompt(getStarted).then((response) => {
        switch (response.action) {
            case "Add Department":
            department();
            break;
            case "Add Role":
            role();
            break;
            case "Add Employee":
            employee();
            break;
            case "View All Departments":
            viewDepartments();
            break;
            case "View All Roles":
            viewRoles();
            break;
            case "View All Employees":
            viewEmployees();
            break;
            case "Delete a Department":
            deleteDepartment();
            break;
            case "Delete a Role":
            deleteRoles();
            break;
            case "Delete an Employee":
            deleteEmployees();
            break;
            case "Update Employees Role":
            updatedEmployees();
            break;
            case "View the total utilized budget of a department":
            totalBudget();
            break;
            case "Exit":
            connection.end();
            break;
            default:
            connection.end()
        }
    });
}

function viewDepartments() {
    connection.query(
     `Select * from department`, 
        function (err, data) {
          if (err) throw err;
          console.table(data);
          mainMenu();
        }
      );
}

function viewEmployees() {
    connection.query(
     `Select * from employee`, 
        function (err, data) {
          if (err) throw err;
          console.table(data);
          mainMenu();
        }
      );
}

function viewRoles() {
    connection.query(
     `Select * from role`, 
        function (err, data) {
          if (err) throw err;
          console.table(data);
          mainMenu();
        }
      );
}