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
            case "Update Employee's Role":
            updatedEmployees();
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
            console.table(answer)

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
                console.table(answer)

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
                    console.table(answer)
                }
            );
            mainMenu()
        })
        };

        const deleteEmployees = () => {
            inquirer.prompt([
              {
                type: 'input',
                message: 'what is the first name of the employee you wish to delete?',
                name: 'first_name'
              },
              {
                type: 'input',
                message: 'what is the last name of the employee you wish to delete?',
                name: 'last_name'
              },
              {
                type: 'number',
                message: 'what is the role ID of the employee you wish to delete?',
                name: 'role_id'
              },
              {
                type: 'number',
                message: 'what is the manager ID of the employee?',
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

          const deleteDepartment = () => {
            inquirer.prompt([
              {
                type: 'input',
                message: 'what is the name of the department you wish to delete?',
                name: 'name'
              }
            ])
          
              .then(answer => {
                const query = `DELETE FROM department WHERE(name) =(
                "${answer.name}")`
                connection.query(query, function (err, res) {
                  if (err) throw err
                  console.table(res)
                  mainMenu()
                })
              })
          };

          
          const deleteRoles = () => {
            inquirer.prompt([
              {
                type: 'input',
                message: 'what is the title of the role you wish to delete?',
                name: 'title'
              },
              {
                type: 'number',
                message: 'what is the salary of the role you wish to delete?',
                name: 'salary'
              },
              {
                type: 'number',
                message: 'what is the department id of the role you wish to delete?',
                name: 'department_id'
              }
            ])
          
              .then(answer => {
                const query = `DELETE FROM role WHERE(title, salary, department_id) =(
                "${answer.title}", "${answer.salary}", "${answer.department_id}")`
                connection.query(query, function (err, res) {
                  if (err) throw err
                  console.table(res)
                  mainMenu()
                })
              })
          };

          function updatedEmployees () {
            inquirer.prompt([
              {
                type: "input",
                name: "id",
                message: "Which employee would you like to update? (Enter Employee ID)"
              },
              {
                type: "input",
                name: "role_id",
                message: "What is the employee's updated role? (Ender Role ID)"
              }
            ]).then (function (answer) {
              var query = "UPDATE employee SET role_id = ? WHERE id = ?";
              connection.query(query,
                [
                  answer.role_id,
                  answer.id
                ],
                function(err, res) {
                  if (err) throw err;
                  console.table(answer);
                  mainMenu();
              });
            });
          };