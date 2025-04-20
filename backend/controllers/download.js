const fs = require('fs').promises;  
const path = require('path');
const {s3, S3_BUCKET} = require("../config/aws-config");

async function downloadFile() {   
    const projectPath = path.resolve(process.cwd(), ".eonPaths"); // Getting the current working directory or folder path
    const sealsPath = path.join(projectPath, "seals");


    try{
        const data = await s3.listObjectsV2({Bucket: S3_BUCKET, Prefix: "seals"}).promise(); // Listing the objects in the S3 bucket with the prefix "seals"
        const objects = data.Contents;// Getting the contents of the objects in the bucket

        for(const object of objects){// Iterating over the objects
            const Key = object.Key;// Getting the key of the object
            const sealDir = path.join(sealsPath, path.dirname(Key).split("/").pop()); // Extracting the seal directory name from the Key

            await fs.mkdir(sealDir, { recursive: true }); // Creating the seal directory if it doesn't exist

            const params = {
                Bucket: S3_BUCKET, // The name of the bucket
                Key: Key, // The path to the file in the bucket // Destination: path.join(sealDir, path.basename(Key))
            };

            const fileContent = await s3.getObject(params).promise(); // Downloading the file from the bucket
            await fs.writeFile(path.join(projectPath, key), fileContent.Body); // Writing the file to the seal directory

            console.log(`sealed files downloaded successfully from s3 `); // Logging the success message
        }

    }catch(error){
        console.error("unable to download : ", error);
    }
}

module.exports = {downloadFile};
