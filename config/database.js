const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.DB_URI;

const mongoConnect = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
};

module.exports = {
  mongoConnect,
};
