const yargs = require("yargs"); // To read command line arguments
const { hideBin } = require("yargs/helpers"); // helps in reading arguments after a space

const { createProject } = require("./controllers/create"); // Importing the createProject function from controllers/create.js
const { loadFile } = require("./controllers/load"); // Importing the loadFile function from controllers/load.js
const { seal} = require("./controllers/seal"); // Importing the seal function from controllers/seal.js
const { uploadFile } = require("./controllers/upload"); // Importing the upload function from controllers/upload.js
const { downloadFile } = require("./controllers/download"); // Importing the download function from controllers/download.js
const { rewindProject } = require("./controllers/rewind"); // Importing the rewind function from controllers/rewind.js
const chalk = require('chalk'); // Importing the chalk module to colorize console output


yargs(hideBin(process.argv))
    
    .command("create", " Initialzed a new project", {}, createProject) // Command to be executed in the terminal
    
    .command(
        "load <file>",
        " add a file to the project",
        (yargs) => {
            yargs.positional("file", {
                describe: "file to be added to the staging area",
                type: "string",
            });
        },
        (argv) =>{
            loadFile(argv.file); // Call the loadFile function with the provided file argument
            console.log(chalk.green.bold(`File ${argv.file} loadFile fuction called`)); // Log the file name to the console
        }
    ) 

    .command(
        "seal <message>",
        " seal the staged files",
        (yargs) => {
            yargs.positional("message", {
                describe: "Seal message",
                type: "string",
            });
        },
        (argv) => {
            seal(argv.message); // Call the seal function with the provided message argument
        }
    )
    .command("upload", " Upload a file to s3", {}, uploadFile) // Command to be executed in the terminal
    .command("download", " Download a file from s3", {}, downloadFile) // Command to be executed in the terminal
    .command(
        "rewind <sealID>",
        " Rewind to a specific seal",
        (yargs) => {
            yargs.positional("sealID", {
                describe: "Commit ID to rewind to",
                type: "string",
            });
        },
        rewindProject
    )



    .demandCommand(
        1,
        "Try searching for help or check the quick start guide for commands"
    ) // Require at least one command
    .help().argv; // Display help information if no command is provided
