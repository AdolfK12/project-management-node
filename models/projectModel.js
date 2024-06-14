const mongoose = require("mongoose");

// Define the schema (structure) for a project
const projectSchema = new mongoose.Schema(
  {
    // 'name' field, which is a string and is required
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true, // Remove whitespace from both ends of the string
    },
    // 'description' field, which is a string and is required
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true, // Remove whitespace from both ends of the string
    },
  },
  { versionKey: false } // Disable the version key (it won't be added to documents)
);

// Create a model from the schema and export it
module.exports = mongoose.model("Project", projectSchema, "project");
