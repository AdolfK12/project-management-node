const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const { isValidObjectId } = require("../helpers/objectIdHelper");

const controller = {
  // Fetch all projects
  getAllProjects: async (req, res, next) => {
    try {
      const projects = await Project.find();
      res
        .status(200)
        .json({ message: "Successfully fetched all projects", data: projects });
    } catch (err) {
      next(err); // Pass the error to the error handler middleware
    }
  },

  // Fetch a single project by its ID
  getProjectById: async (req, res, next) => {
    try {
      const { id } = req.params;
      // Check if the provided ID is valid
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `The provided project ID is invalid: ${id}` });
      }
      const project = await Project.findById(id);
      // If the project is not found, return a 404 error
      if (!project) {
        return res
          .status(404)
          .json({ message: `Project with ID: ${id} not found` });
      }
      res
        .status(200)
        .json({
          message: `Successfully fetched project with ID: ${id}`,
          data: project,
        });
    } catch (err) {
      next(err);
    }
  },

  // Create a new project
  createProject: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      // Check if both name and description are provided
      if (!name || !description) {
        return res
          .status(400)
          .json({ message: "Both name and description are required" });
      }
      const newProject = new Project({ name, description });
      const savedProject = await newProject.save();
      res
        .status(201)
        .json({ message: "Project created successfully", data: savedProject });
    } catch (err) {
      next(err);
    }
  },

  // Update an existing project
  updateProject: async (req, res, next) => {
    try {
      const { id } = req.params;
      // Check if the provided ID is valid
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `The provided ID is invalid: ${id}` });
      }
      const { name, description } = req.body;
      const updateData = {};
      // Update the name and/or description if they are provided
      if (name) updateData.name = name;
      if (description) updateData.description = description;
      const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      // If the project is not found, return a 404 error
      if (!updatedProject) {
        return res
          .status(404)
          .json({ message: `Project with ID: ${id} not found` });
      }
      res
        .status(200)
        .json({
          message: "Project updated successfully",
          data: updatedProject,
        });
    } catch (err) {
      next(err);
    }
  },

  // Delete a project
  deleteProject: async (req, res, next) => {
    try {
      const { id } = req.params;
      // Check if the provided ID is valid
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `The provided ID is invalid: ${id}` });
      }
      const deletedProject = await Project.findByIdAndDelete(id);
      // If the project is not found, return a 404 error
      if (!deletedProject) {
        return res
          .status(404)
          .json({ message: `Project with ID: ${id} not found` });
      }
      res
        .status(200)
        .json({ message: `Project with ID: ${id} deleted successfully` });
    } catch (err) {
      next(err);
    }
  },

  // Create a new task for a specific project
  createTaskForProject: async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { title, description, startTime, endTime } = req.body;
      // Check if the provided project ID is valid
      if (!isValidObjectId(projectId)) {
        return res
          .status(400)
          .json({ message: "The provided project ID is invalid" });
      }
      // Check if title, start time, and end time are provided
      if (!title || !startTime || !endTime) {
        return res
          .status(400)
          .json({ message: "Title, start time, and end time are required." });
      }
      // Check if the project exists
      const projectExists = await Project.findById(projectId);
      if (!projectExists) {
        return res.status(404).json({ message: "Project not found." });
      }
      // Create a new task with the provided details
      const newTask = new Task({
        projectId,
        title,
        description,
        startTime,
        endTime,
      });
      const savedTask = await newTask.save();
      res
        .status(201)
        .json({ message: "Task created successfully.", data: savedTask });
    } catch (err) {
      next(err);
    }
  },

  // Fetch all tasks for a specific project
  getAllTasksForProject: async (req, res, next) => {
    try {
      const { projectId } = req.params;
      // Check if the provided project ID is valid
      if (!isValidObjectId(projectId)) {
        return res
          .status(400)
          .json({ message: "The provided project ID is invalid." });
      }
      // Check if the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found." });
      }
      // Find all tasks associated with the project ID
      const tasks = await Task.find({ projectId: projectId });
      res
        .status(200)
        .json({ message: "Tasks fetched successfully.", data: tasks });
    } catch (err) {
      next(err);
    }
  },
};

// Export the controller so it can be used in other parts of the application
module.exports = controller;
