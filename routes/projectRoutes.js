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

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

router.post("/:projectId/tasks", createTaskForProject);
router.get("/:projectId/tasks", getAllTasksForProject);

module.exports = router;
