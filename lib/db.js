const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_tracker',
  // Put your password below
  password: 'Password',
  port: 5432,
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Database connected successfully.');
  } catch (err) {
    console.error('Database connection failed:', err.stack);
  }
}

async function closeDB() {
  try {
    await client.end();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('Failed to close database connection:', err.stack);
  }
}

module.exports = {
  client,
  connectDB,
  closeDB
};
