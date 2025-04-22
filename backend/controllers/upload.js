const fs = require("fs").promises; // Importing the file system module to read and write files
const path = require("path"); // Importing the path module to create directories
const { s3, S3_BUCKET } = require("../config/aws-config"); // Importing the S3 instance and the bucket name from the AWS config file
const chalk = require('chalk'); // Importing the chalk module to colorize console output

async function uploadFile() {
    const projectPath = path.resolve(process.cwd(), ".eonPaths"); // Getting the current working directory or folder path
    const sealsPath = path.join(projectPath, "seals"); // Creating a path for the sealing directory

    try {
        const sealDirs = await fs.readdir(sealsPath); // Reading the files in the sealing directory
        for (const sealDir of sealDirs) {
            const sealPath = path.join(sealsPath, sealDir); // Creating a path for the file to be uploaded and can have multiple  folders
            const files = await fs.readdir(sealPath); // Reading the files in the sealing directory
        
        for (const file of files) {
            const filePath = path.join(sealPath, file); // Creating a path for the file to be uploaded
            const fileContent = await fs.readFile(filePath); // Reading the file content
            const params = {
                Bucket: S3_BUCKET, // The name of the bucket

                Key: `seals/${sealDir}/${file}`, // The path to the file in the bucket
                Body: fileContent, // The file content
            };
            await s3.upload(params).promise(); // Uploading the file to the bucket , using promis to handle the async operation
        }
    }
        console.log(chalk.green.bold(`\nFile uploaded successfully to S3\n`));

    } catch (error) {
        console.error(chalk.red.bold("\nError sealing file to s3: "), chalk.red(error), '\n');// Logging the error if the directory creation fails
    }
}

module.exports = { uploadFile };// Exporting the function to upload files to s3
