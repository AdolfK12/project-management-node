// Import necessary libraries and files
const express = require("express");
const { mongoConnect } = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const performanceLogger = require("./middlewares/performanceLogger");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express(); // Create an Express application
const PORT = process.env.PORT || 8000; // Set the server port

// Connect to MongoDB and start the server
mongoConnect()
  .then(() => {
    console.log("MongoDB connected successfully");

    app.use(express.json()); // Middleware to parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
    app.use(performanceLogger); // Middleware to log performance
    app.use("/projects", projectRoutes); // Route for project-related endpoints
    app.use("/tasks", taskRoutes); // Route for task-related endpoints

    app.use(errorHandler); // Middleware to handle errors

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
