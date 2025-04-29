const express = require("express"); // Importing the express module to create a web server
const dotenv = require("dotenv"); // Importing the dotenv module to load environment variables from a .env file
const cors = require("cors"); // Importing the cors module to enable Cross-Origin Resource Sharing
const mongoose = require("mongoose"); // Importing the mongoose module to interact with MongoDB
const bodyParser = require("body-parser"); // Importing the body-parser module to parse incoming request bodies
const http = require("http"); // Importing the http module to create an HTTP server
const yargs = require("yargs"); // To read command line arguments
const { hideBin } = require("yargs/helpers"); // helps in reading arguments after a space

const { createProject } = require("./controllers/create"); // Importing the createProject function from controllers/create.js
const { loadFile } = require("./controllers/load"); // Importing the loadFile function from controllers/load.js
const { seal } = require("./controllers/seal"); // Importing the seal function from controllers/seal.js
const { uploadFile } = require("./controllers/upload"); // Importing the upload function from controllers/upload.js
const { downloadFile } = require("./controllers/download"); // Importing the download function from controllers/download.js
const { rewindProject } = require("./controllers/rewind"); // Importing the rewind function from controllers/rewind.js
const { Server } = require("socket.io"); // Importing the Server class from socket.io to enable real-time communication
const chalk = require("chalk"); // Importing the chalk module to colorize console output


dotenv.config(); // Load environment variables from .env file

yargs(hideBin(process.argv))
  .command("start", " starts a new server", {}, startServer) //starting a server
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
    (argv) => {
      loadFile(argv.file); // Call the loadFile function with the provided file argument
      console.log(
        chalk.green.bold(`File ${argv.file} loadFile fuction called`)
      ); // Log the file name to the console
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
    (argv) => {
      rewindProject(argv.sealID); // Call the rewindProject function with the provided sealID argument
    }
  )

  .demandCommand(
    1,
    "Try searching for help or check the quick start guide for commands"
  ) // Require at least one command
  .help().argv; // Display help information if no command is provided

function startServer() {
  const app = express(); // Create an express app
  const port = process.env.PORT || 3000; // Get the port from the environment variable or default to 3000

  app.use(express.json()); // Parse incoming JSON requests
  app.use(bodyParser.json()); // Parse incoming JSON requests

  const mongoURI = process.env.MONGODB_URI; // Get the MongoDB URI from the environment variable

  mongoose
    .connect(mongoURI)
    .then(() => console.log(chalk.green.bold("MongoDB connected")))
    .catch((error) =>
      console.log(chalk.red.bold("MongoDB connection error", error))
    ); // Connection of MongoDB and log the result

    app.use(cors({origin:"*"})); // Enable Cross-Origin Resource Sharing, overriding the default behavior
    app.get("/", (req, res) => {
      res.send("Eon cluster backend server is running");
    });

}
