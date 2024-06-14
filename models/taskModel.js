const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: Date,
      required: [true, "End time is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add text index to title
taskSchema.index({ title: "text" });

// Validate that startTime is before endTime
taskSchema.pre("save", function (next) {
  if (this.startTime >= this.endTime) {
    next(new Error("Start time must be before end time"));
  } else {
    next();
  }
});

// Validate no overlapping tasks within the same project
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
    next();
  }
});

module.exports = mongoose.model("Task", taskSchema, "task");
