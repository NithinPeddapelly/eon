const fs = require('fs').promises; // Importing the file system module to read and write files
const path = require('path'); // Importing the path module to create directories
const {s3, S3_BUCKET} = require("../config/aws-config"); // Importing AWS S3 config
const chalk = require('chalk'); // Importing the chalk module to colorize console output

async function downloadFile() {   
    const projectPath = path.resolve(process.cwd(), ".eonPaths"); // Getting the current working directory or folder path
    const sealsPath = path.join(projectPath, "seals"); // Creating a path for the seals directory

    let downloadCount = 0; // Counter to keep track of how many files were downloaded

    try {
        const data = await s3.listObjectsV2({ Bucket: S3_BUCKET, Prefix: "seals" }).promise(); // Listing the objects in the S3 bucket with the prefix "seals"
        const objects = data.Contents; // Getting the contents of the objects in the bucket

        for (const object of objects) { // Iterating over the objects
            const key = object.Key; // Getting the key of the object
            const sealDir = path.join(sealsPath, path.dirname(key).split("/").pop()); // Extracting the seal directory name from the Key

            await fs.mkdir(sealDir, { recursive: true }); // Creating the seal directory if it doesn't exist

            const params = {
                Bucket: S3_BUCKET, // The name of the bucket
                Key: key, // The path to the file in the bucket
            };

            const fileContent = await s3.getObject(params).promise(); // Downloading the file from the bucket
            await fs.writeFile(path.join(projectPath, key), fileContent.Body); // Writing the file to the seal directory

            downloadCount++; // Incrementing the download counter
        }

        console.log(chalk.green.bold(`\nAll sealed files downloaded successfully from s3 (${downloadCount} files)\n`)); // Logging the success message with file count
        downloadCount = 0; // Resetting the counter after logging

    } catch (error) {
        console.error(chalk.red.bold("\nunable to download sealed files : "), chalk.red(error), '\n'); // Logging the error if downloading fails
    }
}

module.exports = { downloadFile };
