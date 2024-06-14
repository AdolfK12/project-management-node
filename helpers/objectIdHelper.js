const mongoose = require("mongoose");

// Function to check if a given ID is a valid MongoDB ObjectId
const isValidObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id) &&
  new mongoose.Types.ObjectId(id).toString() === id;

module.exports = {
  isValidObjectId,
};
