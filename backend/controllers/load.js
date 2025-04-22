const fs = require("fs").promises; // Importing the file system module to read and write files 
const path = require("path"); // Importing the path module to create directories
const chalk = require('chalk'); // Importing the chalk module to colorize console output

async function loadFile(filepath) { // Function to load a file from a given path
    const projectPath = path.resolve(process.cwd(), ".eonPaths"); // Getting the current working directory or folder path
    const sealingPath = path.join(projectPath, "sealing"); // Creating a path for the sealing directory

    try {
        await fs.mkdir(sealingPath, { recursive: true }); // Creating the sealing file if it doesn't exist
        const fileName = path.basename(filepath); // Getting the file name
        await fs.copyFile(filepath, path.join(sealingPath, fileName)); // Copying the file to the sealing directory
        
        console.log(chalk.green.bold(`\nFile ${fileName} added to the sealing area successfully!_2\n`));

    } catch (error) {

        console.log(chalk.red.bold("\nError sealing file : "), chalk.red(error), '\n');
    }
}

module.exports = { loadFile };
