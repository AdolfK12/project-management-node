module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    // Handle validation errors
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ message: "Validation error", errors });
  }

  if (err.name === "CastError") {
    // Custom message for boolean cast error
    if (err.kind === "Boolean") {
      return res
        .status(400)
        .json({ message: `The field '${err.path}' must be true or false.` });
    }
    // Handle invalid ID format errors
    return res.status(400).json({ message: `Invalid ID format: ${err.value}` });
  }

  // Default error handler
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "An unexpected error occurred on the server.",
  });
};
