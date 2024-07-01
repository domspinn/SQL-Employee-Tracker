const { client } = require('./db');

async function viewAllDepartments() {
  const res = await client.query('SELECT * FROM departments');
  console.table(res.rows);
}

async function viewAllRoles() {
  const res = await client.query(`
    SELECT roles.id, roles.title, roles.salary, departments.name AS department 
    FROM roles 
    JOIN departments ON roles.department_id = departments.id
  `);
  console.table(res.rows);
}

async function viewAllEmployees() {
  const res = await client.query(`
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, managers.first_name AS manager_first_name, managers.last_name AS manager_last_name 
    FROM employees 
    JOIN roles ON employees.role_id = roles.id 
    JOIN departments ON roles.department_id = departments.id 
    LEFT JOIN employees AS managers ON employees.manager_id = managers.id
  `);
  console.table(res.rows);
}

async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      name: 'name',
      message: 'Enter the name of the department:'
    }
  ]);
  await client.query('INSERT INTO departments (name) VALUES ($1)', [name]);
  console.log('Department added!');
}

async function addRole() {
  const departments = await client.query('SELECT * FROM departments');
  const { title, salary, department_id } = await inquirer.prompt([
    {
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departments.rows.map(department => ({
        name: department.name,
        value: department.id
      }))
    }
  ]);
  await client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  console.log('Role added!');
}

async function addEmployee() {
  const roles = await client.query('SELECT * FROM roles');
  const employees = await client.query('SELECT * FROM employees');
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      name: 'first_name',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'last_name',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role for the employee:',
      choices: roles.rows.map(role => ({
        name: role.title,
        value: role.id
      }))
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager for the employee:',
      choices: [{ name: 'None', value: null }].concat(
        employees.rows.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }))
      )
    }
  ]);
  await client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  console.log('Employee added!');
}

async function updateEmployeeRole() {
  const employees = await client.query('SELECT * FROM employees');
  const roles = await client.query('SELECT * FROM roles');
  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee to update:',
      choices: employees.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }))
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role for the employee:',
      choices: roles.rows.map(role => ({
        name: role.title,
        value: role.id
      }))
    }
  ]);
  await client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  console.log('Employee role updated!');
}

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
