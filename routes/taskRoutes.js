const express = require("express");
const router = express.Router();
const {
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
  markTaskAsCompleted,
  getIncompleteTasksForProject,
} = require("../controllers/taskController");

// Define routes for task-related operations
router.get("/search", searchTasks); // Search tasks by keyword
router.get("/:id", getTaskById); // Get a task by ID
router.put("/:id", updateTask); // Update a task by ID
router.delete("/:id", deleteTask); // Delete a task by ID
router.put("/:id/complete", markTaskAsCompleted); // Mark a task as completed
router.get("/projects/:projectId/incomplete", getIncompleteTasksForProject); // Get all incomplete tasks for a specific project

module.exports = router;
