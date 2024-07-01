-- Clear existing data
DELETE FROM employees;
DELETE FROM roles;
DELETE FROM departments;

-- Reset the sequence for primary keys
ALTER SEQUENCE employees_id_seq RESTART WITH 1;
ALTER SEQUENCE roles_id_seq RESTART WITH 1;
ALTER SEQUENCE departments_id_seq RESTART WITH 1;

-- Insert departments
INSERT INTO departments (name) VALUES 
('Engineering'), 
('Finance'), 
('Legal'), 
('Sales');

-- Insert roles
INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 100000, 1),
('Accountant', 80000, 2),
('Lawyer', 120000, 3),
('Salesperson', 70000, 4);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mary', 'Johnson', 3, 1),
('James', 'Brown', 4, 1);
