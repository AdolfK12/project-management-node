const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  createTaskForProject,
  getAllTasksForProject,
} = require("../controllers/projectController");

// Define routes for project-related operations
router.get("/", getAllProjects); // Get all projects
router.get("/:id", getProjectById); // Get a project by ID
router.post("/", createProject); // Create a new project
router.put("/:id", updateProject); // Update a project by ID
router.delete("/:id", deleteProject); // Delete a project by ID

// Define routes for task-related operations within a project context
router.post("/:projectId/tasks", createTaskForProject); // Create a task for a specific project
router.get("/:projectId/tasks", getAllTasksForProject); // Get all tasks for a specific project

module.exports = router;
