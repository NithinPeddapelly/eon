const fd = require("fs").promises; // Importing the file system module to read and write files
const path = require("path"); // Importing the path module to create directories


async function loadFile() {
    const projectPath = path.resolve(process.cwd(), ".eonPaths") // Getting the current working directory or folder path
    const sealingPath = path.join(projectPath, "sealing") // Creating a path for the sealing directory

    try{
        await fs.mkdir(sealingPath, { recursive: true }); // Creating the sealing file if it doesn't exist
        
    }catch(error) {
    console.log("Error sealing file : ",error); // Logging the error if the directory creation fails
    }
}

module.exports = {loadFile};