// middleware/error-handler.js

module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ message: "Validation error", errors });
  }

  if (err.name === "CastError") {
    // Custom message for boolean cast error
    if (err.kind === "Boolean") {
      return res
        .status(400)
        .json({ message: `Invalid boolean format for field: ${err.path}` });
    }
    return res.status(400).json({ message: `Invalid ID format: ${err.value}` });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred on the server.",
  });
};
