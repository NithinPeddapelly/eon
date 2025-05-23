const fs = require("fs").promises; // Importing the file system module to read and write files
const path = require("path"); // Importing the path module to create directories
const { v4: uuidv4 } = require("uuid"); // Importing the uuid module to generate unique IDs
const chalk = require('chalk'); // Importing the chalk module to colorize console output

async function seal(message) {// Function to seal a file with a given message
  const projectPath = path.resolve(process.cwd(), ".eonPaths"); // Getting the current working directory or folder path
  const sealingPath = path.join(projectPath, "sealing"); // Creating a path for the sealing directory
  const sealPath = path.join(projectPath, "seals"); // Creating a path for the seals directory

  try 
  {
    const sealID = uuidv4(); // Generating a unique ID for the seal
    const sealDir = path.join(sealPath, sealID); // Creating a path for the seal directory
    await fs.mkdir(sealDir, { recursive: true }); // Creating the seal directory if it doesn't exist
    const files = await fs.readdir(sealingPath); // Reading the files in the sealing directory

    for (const file of files) {
      await fs.copyFile(
        path.join(sealingPath, file), 
        path.join(sealDir, file)
        ); // Copying the files to the seal directory
    }

    await fs.writeFile(
        path.join(sealDir, "seal.json"),
        JSON.stringify({ message, date:new Date().toISOString() })
    );// Writing the seal.json file with the message and date
    console.log(chalk.green.bold(`\nSeal ${sealID} created successfully! with message ${message} \n`));
    console.log(); // Logging the success message
  } catch (error) {
    console.error(chalk.red.bold("\nError sealing file : "), chalk.red(error), '\n');
  }
}

module.exports = { seal };
