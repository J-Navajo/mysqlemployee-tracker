DROP DATABASE IF EXISTS emp_tracker_DB;
CREATE database emp_tracker_DB;

USE emp_tracker_DB;

CREATE TABLE employee (
  id INT NOT NULL auto_increment,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (role_id),
  FOREIGN KEY (manager_id)

);


CREATE TABLE emp_role (
  id INT NOT NULL auto_increment,
  title VARCHAR(30) NULL,
  salary DECIMAL,
  department_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
);

CREATE TABLE department (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employee;
-- select * from emp_role;
-- SELECT * FROM department;
