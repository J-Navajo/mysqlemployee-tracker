/* Seeds for SQL table. We haven't discussed this type of file yet */
USE emp_tracker_DB;

/* Insert 3 Rows into your new table */
INSERT INTO employee (first_name, last_name)
VALUES ("John", "Doe");

INSERT INTO employee (first_name, last_name)
VALUES ("Mike", "Chan");

INSERT INTO employee (first_name, last_name)
VALUES ("Ashley", "Rodriguez");

INSERT INTO employee (first_name, last_name)
VALUES ("Kevin", "Tupik");



/* Insert 3 Rows into your new table */
INSERT INTO emp_role (title, salary)
VALUES ("Sales Lead", 10000);

INSERT INTO emp_role (title, salary)
VALUES ("Salesperson", 80000);

INSERT INTO emp_role (title, salary)
VALUES ("Lead Engineer", 140000);

INSERT INTO emp_role (title, salary)
VALUES ("Software Engineer", 110000);


INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");