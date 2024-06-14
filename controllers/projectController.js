const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const { isValidObjectId } = require("../helpers/objectIdHelper");

const controller = {
  getAllProjects: async (req, res, next) => {
    try {
      const projects = await Project.find();
      res
        .status(200)
        .json({ message: "Successfully fetched all projects", data: projects });
    } catch (err) {
      next(err);
    }
  },

  getProjectById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `Invalid project ID format: ${id}` });
      }
      const project = await Project.findById(id);
      if (!project) {
        return res
          .status(404)
          .json({ message: `Project with id: ${id} not found` });
      }
      res.status(200).json({
        message: `Successfully fetched project with id: ${id}`,
        data: project,
      });
    } catch (err) {
      next(err);
    }
  },

  createProject: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res
          .status(400)
          .json({ message: "Name and description are required" });
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

  updateProject: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: `Invalid ID format: ${id}` });
      }
      const { name, description } = req.body;
      const updateData = {};
      if (name) updateData.name = name;
      if (description) updateData.description = description;
      const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedProject) {
        return res
          .status(404)
          .json({ message: `Project with id: ${id} not found` });
      }
      res.status(200).json({
        message: `Project updated successfully`,
        data: updatedProject,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteProject: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: `Invalid ID format: ${id}` });
      }
      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) {
        return res
          .status(404)
          .json({ message: `Project with id: ${id} not found` });
      }
      res
        .status(200)
        .json({ message: `Project with id: ${id} deleted successfully` });
    } catch (err) {
      next(err);
    }
  },

  createTaskForProject: async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { title, description, startTime, endTime } = req.body;
      if (!isValidObjectId(projectId)) {
        return res.status(400).json({ message: "Invalid project ID format." });
      }
      if (!title || !startTime || !endTime) {
        return res
          .status(400)
          .json({ message: "Title, start time, and end time are required." });
      }
      const projectExists = await Project.findById(projectId);
      if (!projectExists) {
        return res.status(404).json({ message: "Project not found." });
      }
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
  getAllTasksForProject: async (req, res, next) => {
    try {
      const { projectId } = req.params;

      if (!isValidObjectId(projectId)) {
        return res.status(400).json({ message: "Invalid project ID format." });
      }

      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found." });
      }

      const tasks = await Task.find({ projectId: projectId });
      res
        .status(200)
        .json({ message: "Tasks fetched successfully.", data: tasks });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = controller;
