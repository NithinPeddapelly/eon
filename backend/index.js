const yargs = require('yargs');  // To read command line arguments
const { hideBin } = require('yargs/helpers'); // helps in reading arguments after a space


yargs(hideBin(process.argv)).command('launch', "Initialze a new project", {})