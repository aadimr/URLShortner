const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      fullName: String,
      emailId: String,
      password: String,
      confirmPassword: String,
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("User", userSchema);