const mongoose = require("mongoose");

const isValidObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id) &&
  new mongoose.Types.ObjectId(id).toString() === id;

module.exports = {
  isValidObjectId,
};
