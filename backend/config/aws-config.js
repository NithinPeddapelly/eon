const AWS = require("aws-sdk");// Importing the AWS SDK

AWS.config.update({ region: "eu-north-1" });// Updating the region to EU North 1

const s3 = new AWS.S3();// Creating an S3 instance with the specified region
const S3_BUCKET = "eonfiles";// The name of the S3 bucket where files will be uploaded and downloaded

module.exports = {s3, S3_BUCKET};// Exporting the S3 instance and the bucket name