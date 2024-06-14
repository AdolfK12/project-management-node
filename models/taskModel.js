const mongoose = require("mongoose");

// Define the schema (structure) for a task
const taskSchema = new mongoose.Schema(
  {
    // 'projectId' field, which is a reference to a project and is required
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
    },
    // 'title' field, which is a string and is required
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true, // Remove whitespace from both ends of the string
    },
    // 'description' field, which is a string
    description: {
      type: String,
      trim: true, // Remove whitespace from both ends of the string
    },
    // 'startTime' field, which is a date and is required
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },
    // 'endTime' field, which is a date and is required
    endTime: {
      type: Date,
      required: [true, "End time is required"],
    },
    // 'completed' field, which is a boolean (true/false) and defaults to false
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add 'createdAt' and 'updatedAt' fields
    versionKey: false, // Disable the version key (it won't be added to documents)
  }
);

// Create an index on 'title' and 'description' fields to speed up text search
taskSchema.index({ title: "text", description: "text" });

// Pre-save hook to validate that 'startTime' is before 'endTime'
taskSchema.pre("save", function (next) {
  if (this.startTime >= this.endTime) {
    next(new Error("Start time must be before end time")); // Error if times are invalid
  } else {
    next(); // Proceed if times are valid
  }
});

// Pre-save hook to check for overlapping tasks within the same project
taskSchema.pre("save", async function (next) {
  const overlappingTasks = await mongoose.model("Task").find({
    projectId: this.projectId,
    _id: { $ne: this._id }, // Exclude this task if it's an update
    $or: [
      { startTime: { $lte: this.endTime, $gte: this.startTime } },
      { endTime: { $lte: this.endTime, $gte: this.startTime } },
    ],
  });

  if (overlappingTasks.length > 0) {
    next(
      new Error("Tasks overlap in time within the same project is not allowed.")
    );
  } else {
    next(); // Proceed if no overlap
  }
});

// Create a model from the schema and export it
module.exports = mongoose.model("Task", taskSchema, "task");
