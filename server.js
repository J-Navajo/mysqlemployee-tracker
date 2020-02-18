const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "emp_tracker_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runEmployee();
});

function runEmployee() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all list of employees",
        "View all employees by department",
        "View all employees by manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all list of employees":
        employeeList();
        break;

      case "View all employees by department":
        departmentSearch();
        break;

      case "View all employees by manager":
        managerSearch();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "Remove Employee":
        removeEmployee();
        break;

      case "Update Employee Role":
        updateRole();
        break;

      case "Update Employee Manager":
        updateManager();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}


