const express = require("express");
const { mongoConnect } = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

mongoConnect()
  .then(() => {
    console.log("MongoDB connected successfully");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/projects", projectRoutes);
    app.use("/tasks", taskRoutes);

    // Error Handler Middleware should be the last piece of middleware
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
