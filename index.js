const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql");
const chalk = require('chalk');



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
console.log(chalk.blue("______________ WELCOME_____________"));

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

function department() {
inquirer
.prompt([
    {
        name: "department",
        type: "input",
        message: "What is the name of this department?",
    },
])
.then(function (answer) {
    connection.query(
        "INSERT INTO department SET ?",
        {
            name: answer.department,
        },
        function (err) {
            if (err) throw err;
        }
    );
    mainMenu()
})
};

function role() {
    inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of this role?",
        },
        {
            name: "salary",
            type: "number",
            message: "What is the salary of this role?",
        },
        {
            name: "department_id",
            type: "number",
            message: "What is the id of this department?",
        },
    ])
    .then(function (answer) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id,
            },
            function (err) {
                if (err) throw err;
            }
        );
        mainMenu()
    })
    };

    function employee() {
        inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the first name of this employee?",
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the last name of this employee?",
            },
            {
                name: "role_id",
                type: "number",
                message: "What is the role id of this employee?",
            },
            {
                name: "manager_id",
                type: "number",
                message: "If this employee is a manager enter their number otherwise click ok.",
                default: false,
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,

                },
                function (err) {
                    if (err) throw err;
                }
            );
            mainMenu()
        })
        };

        const deleteEmployees = () => {
            inquirer.prompt([
              {
                type: 'input',
                message: 'what is the first name of the new employee?',
                name: 'first_name'
              },
              {
                type: 'input',
                message: 'what is the last name of the new employee?',
                name: 'last_name'
              },
              {
                type: 'number',
                message: 'what is the role ID of the new employee?',
                name: 'role_id'
              },
              {
                type: 'number',
                message: 'what is the manager ID of the new employee?',
                name: 'manager_id'
              }
            ])
          
              .then(answer => {
                const query = `DELETE FROM employee WHERE(first_name, last_name, role_id, manager_id) =(
                "${answer.first_name}", "${answer.last_name}", "${answer.role_id}", "${answer.manager_id}")`
                connection.query(query, function (err, res) {
                  if (err) throw err
                  console.table(res)
                  mainMenu()
                })
              })
          };
