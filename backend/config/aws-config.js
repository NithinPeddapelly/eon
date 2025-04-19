const AWS = require("aws-sdk");

AWS.config.update({region: "ap-south-1"});

const s3 = new AWS.S3();// Creating an S3 instance with the specified region
const S3_BUCKET_NAME = "eonofbuckets";// The name of the S3 bucket where files will be uploaded and downloaded

module.exports = {s3, S3_BUCKET_NAME};// Exporting the S3 instance and the bucket name