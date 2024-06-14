const Task = require("../models/taskModel");
const { isValidObjectId } = require("../helpers/objectIdHelper");

const taskController = {
  // Fetch a single task by its ID
  getTaskById: async (req, res, next) => {
    try {
      const { id } = req.params;
      // Check if the provided task ID is valid
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `The provided task ID is invalid: ${id}` });
      }

      const task = await Task.findById(id);
      // If the task is not found, return a 404 error
      if (!task) {
        return res
          .status(404)
          .json({ message: `Task with ID: ${id} not found` });
      }

      res
        .status(200)
        .json({ message: "Task fetched successfully.", data: task });
    } catch (err) {
      next(err); // Pass the error to the error handler middleware
    }
  },

  // Update an existing task
  updateTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, startTime, endTime, completed } = req.body;

      // Check if the provided task ID is valid
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `The provided task ID is invalid: ${id}` });
      }

      const updateData = {};
      // Update the title, description, start time, and/or end time if they are provided
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (startTime) updateData.startTime = startTime;
      if (endTime) updateData.endTime = endTime;

      // Check if the completed field is provided
      if (completed === undefined) {
        return res.status(400).json({
          message: "The 'completed' field must have a value of true or false",
        });
      } else {
        updateData.completed = completed;
      }

      const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      // If the task is not found, return a 404 error
      if (!updatedTask) {
        return res
          .status(404)
          .json({ message: `Task with ID: ${id} not found` });
      }

      res
        .status(200)
        .json({ message: "Task updated successfully.", data: updatedTask });
    } catch (err) {
      next(err);
    }
  },

  // Delete a task
  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Check if the provided task ID is valid
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `The provided task ID is invalid: ${id}` });
      }

      const deletedTask = await Task.findByIdAndDelete(id);
      // If the task is not found, return a 404 error
      if (!deletedTask) {
        return res
          .status(404)
          .json({ message: `Task with ID: ${id} not found` });
      }

      res
        .status(200)
        .json({ message: `Task with ID: ${id} deleted successfully` });
    } catch (err) {
      next(err);
    }
  },

  // Search for tasks by a keyword in the title or description
  searchTasks: async (req, res, next) => {
    try {
      const { q } = req.query;
      // Check if the search keyword is provided
      if (!q) {
        return res
          .status(400)
          .json({ message: "Please provide a search keyword" });
      }

      // Search for tasks that contain the keyword in their title or description, case-insensitive
      const tasks = await Task.find({
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      });

      res
        .status(200)
        .json({ message: "Tasks fetched successfully.", data: tasks });
    } catch (err) {
      next(err);
    }
  },

  // Mark a task as completed
  markTaskAsCompleted: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Check if the provided task ID is valid
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `The provided task ID is invalid: ${id}` });
      }

      // Update the task to set 'completed' to true
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { completed: true },
        { new: true, runValidators: true }
      );

      // If the task is not found, return a 404 error
      if (!updatedTask) {
        return res
          .status(404)
          .json({ message: `Task with ID: ${id} not found` });
      }

      res
        .status(200)
        .json({ message: "Task marked as completed.", data: updatedTask });
    } catch (err) {
      next(err);
    }
  },

  // Get all incomplete tasks for a specific project
  getIncompleteTasksForProject: async (req, res, next) => {
    try {
      const { projectId } = req.params;

      // Check if the provided project ID is valid
      if (!isValidObjectId(projectId)) {
        return res
          .status(400)
          .json({ message: "The provided project ID is invalid." });
      }

      // Find all tasks for the project that are not completed
      const tasks = await Task.find({ projectId, completed: false });
      res
        .status(200)
        .json({
          message: "Incomplete tasks fetched successfully.",
          data: tasks,
        });
    } catch (err) {
      next(err);
    }
  },
};

// Export the task controller so it can be used in other parts of the application
module.exports = taskController;
