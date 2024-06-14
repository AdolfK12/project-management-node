const express = require("express");
const router = express.Router();
const {
  getTaskById,
  updateTask,
  deleteTask,
  searchTasks,
} = require("../controllers/taskController");

// Search tasks
router.get("/search", searchTasks);

// Standard task routes
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
