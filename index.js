const { mainMenu } = require('./lib/prompts');
const { connectDB, closeDB } = require('./lib/db');

async function startApp() {
  await connectDB();
  await mainMenu();
  await closeDB();
}

startApp();
