const fs = require("fs").promises; // Importing the file system module to read and write files
const path = require("path"); // Importing the path module to create directories
const {promisify} = require("util"); // Importing the promisify function to use fs.readFile in a promise
const chalk = require('chalk'); // Importing the chalk module to colorize console output
const readdir = promisify(fs.readdir); // Promisifying the fs.readdir function to use it with async/await



async function rewindProject() {   
    
}

module.exports = {rewindProject};
