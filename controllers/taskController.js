const Task = require("../models/taskModel");
const { isValidObjectId } = require("../helpers/objectIdHelper");

const taskController = {
  getTaskById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `Invalid task ID format: ${id}` });
      }

      const task = await Task.findById(id);
      if (!task) {
        return res
          .status(404)
          .json({ message: `Task with id: ${id} not found` });
      }

      res
        .status(200)
        .json({ message: "Task fetched successfully.", data: task });
    } catch (err) {
      next(err);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, startTime, endTime, completed } = req.body;

      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `Invalid task ID format: ${id}` });
      }

      const updateData = {};
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (startTime) updateData.startTime = startTime;
      if (endTime) updateData.endTime = endTime;

      if (completed === undefined) {
        return res.status(400).json({
          message: "Completed field must have a value of true or false",
        });
      } else {
        updateData.completed = completed;
      }

      const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedTask) {
        return res
          .status(404)
          .json({ message: `Task with id: ${id} not found` });
      }

      res
        .status(200)
        .json({ message: "Task updated successfully.", data: updatedTask });
    } catch (err) {
      next(err);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `Invalid task ID format: ${id}` });
      }

      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res
          .status(404)
          .json({ message: `Task with id: ${id} not found` });
      }

      res
        .status(200)
        .json({ message: `Task with id: ${id} deleted successfully` });
    } catch (err) {
      next(err);
    }
  },

  searchTasks: async (req, res, next) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res
          .status(400)
          .json({ message: "Please provide a search keyword" });
      }

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
};

module.exports = taskController;
