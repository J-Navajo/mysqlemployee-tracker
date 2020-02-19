const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
        // "View all employees by department",
        // "View all employees by manager",
        "Add Employee",
        "Add Department",
        "Add Manager Role",
        // "Remove Employee",
        // "Update Employee Role",
        // "Update Employee Manager"
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View all list of employees":
        employeeList();
        break;

      // case "View all employees by department":
      //   departmentSearch();
      //   break;

      // case "View all employees by manager":
      //   managerSearch();
      //   break;

      case "Add Employee":
        addEmployee();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Add Manager Role":
        addRole();
        break;

      // case "Remove Employee":
      //   removeEmployee();
      //   break;

      // case "Update Employee Role":
      //   updateRole();
      //   break;

      // case "Update Employee Manager":
      //   updateManager();
      //   break;

      case "Exit":
        connection.end();
        break;
      }
    });
}

function employeeList() {
  const query = "SELECT id, first_name, last_name FROM employee";
  connection.query(query, function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.table(res[i].id + " " + res[i].first_name + " " + res[i].last_name);
    }
    runEmployee();
  });
}

function addEmployee() {
  inquirer
    .prompt ( [
      {
      name: "first_name",
      type: "input",
      message: "what is the first name of the new employee?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the last name of the new employee?"
    }
  ])
    .then(function(answer) {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " new employee added!\n");
          // Call updateProduct AFTER the INSERT completes
          runEmployee();
        }
      );
    })
}

function addDepartment() {
  inquirer
    .prompt ( [
      {
      name: "name",
      type: "input",
      message: "what is the department name?"
    }
  ])
    .then(function(answer) {
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department added!\n");
          // Call updateProduct AFTER the INSERT completes
          runEmployee();
        }
      );
    })
}

function addRole() {
  inquirer
    .prompt ([
      {
      name: "title",
      type: "input",
      message: "Enter Manager role?"
    },
    {
      name: "salary",
      type: "input",
      message: "Enter salary amount"
    }
  ])
    .then(function(answer) {
      const query = connection.query(
        "INSERT INTO emp_role SET ?",
        {
          title: answer.title,
          salary: answer.salary
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " role added!\n");
          // Call updateProduct AFTER the INSERT completes
          runEmployee();
        }
      );
    })
}