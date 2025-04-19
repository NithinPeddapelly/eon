const fs = require("fs").promises; // Importing the file system module to read and write files
const path = require("path"); // Importing the path module to create directories


async function loadFile(filepath) { // Function to load a file from a given path
    const projectPath = path.resolve(process.cwd(), ".eonPaths") // Getting the current working directory or folder path
    const sealingPath = path.join(projectPath, "sealing") // Creating a path for the sealing directory

    try{
        await fs.mkdir(sealingPath, { recursive: true }); // Creating the sealing file if it doesn't exist
        const fileName = path.basename(filepath); // Getting the file name
        await fs.copyFile(filepath, path.join(sealingPath, fileName)); // Copying the file to the sealing directory
        console.log(`File ${fileName} added to the sealing area successfully!_2`); // Logging the success message using "`" to avoid escaping the special characters


    }catch(error) {
    console.log("Error sealing file : ",error); // Logging the error if the directory creation fails
    }
}

module.exports = {loadFile};