const fs = require("fs");// Importing the fs module to read and write files
const path = require("path"); // Importing the path module to create directories
const {promisify} = require("util"); // Importing the promisify function to use fs.readFile in a promise
const chalk = require('chalk'); // Importing the chalk module to colorize console output

const readdir = promisify(fs.readdir); // reads if only the files exist in the directory ,  //custom overwrite function to read the directory
const copyFile = promisify(fs.copyFile); // copies a file from one location to another


async function rewindProject(sealID) {   
    const projectPath = path.resolve(process.cwd(), ".eonPaths"); // Getting the current working directory
    const sealPath = path.join(projectPath, "seals"); // Creating a path for the seals directory

    try{
        const sealDir = path.join(sealPath, sealID); // Creating a path for the seal directory
        const files = await readdir(sealDir); // Reading the files in the seal directory , if somthing is wrong it will throw an error that means there is no such sealID
        const parentDir = path.resolve(projectPath, ".."); // Getting the parent directory of the seal directory

        for (const file of files) {
            await copyFile(
                path.join(sealDir, file), 
                path.join(parentDir, file)
                ); // Copying the files from the seal directory to the parent directory
        }
        console.log(chalk.green.bold(`\nProject rewinded successfully to ${sealID} seal \n`));

    } catch(error){
        console.error(chalk.red.bold("\nError rewinding project : "), chalk.red(error), '\n');
    }

}

module.exports = {rewindProject};
