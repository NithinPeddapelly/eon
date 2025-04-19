const fs = require("fs").promises; // Importing the file system module to read and write files
const path = require("path"); // Importing the path module to create directories
const {v4: uuidv4} = require('uuid'); // Importing the uuid module to generate unique IDs


async function sealFile(message) { // Function to seal a file with a given message
    const projectPath = path.resolve(process.cwd(), ".eonPaths") // Getting the current working directory or folder path
    const sealingPath = path.join(projectPath, "sealing") // Creating a path for the sealing directory
    const sealsPath = path.join(projectPath, "seals") // Creating a path for the seals directory

    try{
        const sealID = uuidv4(); // Generating a unique ID for the seal
        const sealDir = path.join(sealsPath, sealID); // Creating a path for the seal directory
        await fs.mkdir(sealDir, { recursive: true }); // Creating the seal directory if it doesn't exist
    
    }catch(error) {
        console.error("Error sealing file : ",error);     }

}

module.exports = {sealFile};