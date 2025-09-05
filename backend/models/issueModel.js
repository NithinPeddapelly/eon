import { required } from "yargs";

const mongoose = require("mongoose");// Importing the mongoose module to interact with MongoDB
const {Schema} = mongoose; // Importing the Schema class from mongoose

const IssueSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["open", "in-progress", "closed"], // The status can only be one of these values
        default: "open", // The default status is "open"
    },
    Project:{
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
 });

const Issue = mongoose.model("Issue", IssueSchema); // Creating a model from the schema
export default Issue; // Exporting the Issue model as the default export of this module