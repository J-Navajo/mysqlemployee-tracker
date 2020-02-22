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

connection.connect(function (err) {
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
        "View all employees by role",
        "Add Employee",
        "Add Department",
        "Add Employee Role",
        "Update Employee Role",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all list of employees":
          employeeList();
          break;

        case "View all employees by department":
          departmentSearch();
          break;

        case "View all employees by role":
          roleList();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Manager Role":
          addRole();
          break;

        case "Update Employee Role":
          updateRole();
          break;

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
  connection.query(query, function (err, res) {
    for (let i = 0; i < res.length; i++) {
      console.table(res[i].id + " " + res[i].first_name + " " + res[i].last_name);
    }
    runEmployee();
  });
}

function addEmployee() {
  inquirer
    .prompt([
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
    .then(function (answer) {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name
        },
        function (err, res) {
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
    .prompt([
      {
        name: "name",
        type: "input",
        message: "what is the department name?"
      }
    ])
    .then(function (answer) {
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name
        },
        function (err, res) {
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
    .prompt([
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
    .then(function (answer) {
      const query = connection.query(
        "INSERT INTO emp_role SET ?",
        {
          title: answer.title,
          salary: answer.salary
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " role added!\n");
          // Call updateProduct AFTER the INSERT completes
          runEmployee();
        }
      );
    })
}

function findRoles() {
  return new Promise(function (resolve, reject) {

    const statement = connection.query(
      "SELECT emp_role.id, emp_role.title, department.name AS department, emp_role.salary FROM emp_role LEFT JOIN department on emp_role.department_id = department.id",

      function (err, data) {
        resolve(data)
      });
    console.log(statement.sql)
  })
}

function updateRole() {
  findRoles().then(function (data) {
    console.log(data)
    let roles = data.map(data => data.id + " " + data.department + " " + data.title + " " + data.salary)

    inquirer
      .prompt(
        {
          name: "list",
          message: "Enter new employee role?",
          choices: roles,
          name: "roleId"
        }
      )
      .then(function (data) {
        const id = data.roleId.split(" ")
        const getId = id[0]
        inquirer.prompt([
          {
            type: "input",
            message: "What is the new title?",
            name: "updateRole"
          }
        ]).then(function (input) {
          connection.query("update role SET title=?", [input.updateRole, getId], function (err, data) {
            runEmployee()
          })
        })

      })
  })

}

function departmentSearch() {
  const query = "SELECT id, name FROM department";
  connection.query(query, function (err, res) {
    for (let i = 0; i < res.length; i++) {
      console.table(res[i].id + " " + res[i].name);
    }
    runEmployee();
  });
}

function roleList() {
  const query = "SELECT id, title FROM emp_role";
  connection.query(query, function (err, res) {
    for (let i = 0; i < res.length; i++) {
      console.table(res[i].id + " " + res[i].title);
    }
    runEmployee();
  });
}