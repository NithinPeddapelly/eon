const fs = require("fs").promises; // Importing the file system module to read and write files
const path = require("path"); // Importing the path module to create directories
const chalk = require('chalk'); // Importing the chalk module to colorize console output

async function createProject() {   
    const projectPath = path.resolve(process.cwd(), ".eonPaths") // Getting the current working directory or folder path and it is a hidden folder
    const sealsPath = path.join(projectPath, "seals") // Creating a path for the seals directory

    try{
        await fs.mkdir(projectPath, { recursive: true }); // Creating the project directory if it doesn't exist
        await fs.mkdir(sealsPath, { recursive: true }); // Creating the seals directory if it doesn't exist
        await fs.writeFile(
            path.join(projectPath, "config.json"), JSON.stringify({bucket : process.env.S3_BUCKET_NAME})); // Creating an empty seals.json file 
            console.log(chalk.green.bold(`\nProject directory created successfully!\n`)); // Logging the success message
        } catch(error) {
            console.error(chalk.red.bold("\nError creating project directory:"), chalk.red(error), '\n');// Logging the error if the directory creation fails
    }
}

module.exports = {createProject};
