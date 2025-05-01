const mongoose = require("mongoose");// Importing the mongoose module to interact with MongoDB
const {Schema} = mongoose; // Importing the Schema class from mongoose

const UserSchema = new Schema({ // Defining a new schema for the user model 
    username: { // Defining a field for the username
        type: String, // The type of the field is String
        required: true, // This field is required
        unique: true, // This field must be unique
    },
    email: { // Defining a field for the email
        type: String, // The type of the field is String
        required: true, // This field is required
        unique: true, // This field must be unique
    },
    password: { // Defining a field for the password
        type: String, // The type of the field is String
        required: true, // This field is required
    },
    projects: [{ // Defining a field for the projects
        default: [], // The default value is an empty array
        type: Schema.Types.ObjectId, // The type of the field is ObjectId, its gonna point another object.
        ref: "Project", // This field references the Project model
    }],
    followedUsers: [{ 
        default: [], 
        type: Schema.Types.ObjectId,
        ref: "user", 
    }],
    StarProjects: [{ 
        default: [], 
        type: Schema.Types.ObjectId,
        ref: "project",
    }],
    
}) 

const User = mongoose.model("User", UserSchema); // Creating a model named User based on the UserSchema

export default User; // Exporting the User model as the default export of this module