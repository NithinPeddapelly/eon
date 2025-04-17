const fs = require("fs").promises; // Importing the file system module to read and write files
const path = require("path"); // Importing the path module to create directories


async function createProject() {   
    const projectPath = path.resolve(process.cwd(), ".eonPaths") // Getting the current working directory or folder path
    const sealPath = path.join(projectPath, "seals") // Creating a path for the seals directory

    try{
        await fs.mkdir(projectPath, { recursive: true }); // Creating the seals directory if it doesn't exist
        await fs.mkdir(sealPath, { recursive: true }); // Creating the seals directory if it doesn't exist
        await fs.writeFile(
            path.join(projectPath, "config.json"), JSON.stringify({bucket : process.env.S3_BUCKET_NAME})); // Creating an empty seals.json file 
    } catch(error) {
        console.error("Error creating project directory:", error); // Logging the error if the directory creation fails
    }
}

module.exports = {createProject};
