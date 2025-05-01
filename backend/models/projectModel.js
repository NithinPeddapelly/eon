const mongoose = require("mongoose");// Importing the mongoose module to interact with MongoDB
const { required } = require("yargs");
const {Schema} = mongoose; // Importing the Schema class from mongoose

const ProjectSchema = new Schema({ // Defining a new schema for the project model
    name: { // Defining a field for the project name
        type: String, // The type of the field is String
        required: true, // This field is required
        unique: true, // This field must be unique
    },
    description: { // Defining a field for the project description
        type: String, // The type of the field is String
        required: true, // This field is required
    },
    content:[{
        type: String, // The type of the field is String
      
    },],

    visibility: { // Defining a field for the project visibility
        type: Boolean, // The type of the field is String
        enum: ["public", "private"], // The field can only be "public" or "private"
        default: "private", // The default value is "private"
    },  
    owner: { // Defining a field for the project owner
        type: Schema.Types.ObjectId, // The type of the field is ObjectId, its gonna point another object.
        ref: "User", // This field references the User model
        required : true, // This field is required
    },
    issues:[{
        type: Schema.Types.ObjectId, // The type of the field is ObjectId, its gonna point another object.
        ref: "Issue", // This field references the Issue model
    }],
})

const Project = mongoose.model("Project", ProjectSchema); // Creating a model from the schema
export default Project; // Exporting the Project model as the default export of this module