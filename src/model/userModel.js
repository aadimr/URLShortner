const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      fullName: {
        type:String,
        require:true,
      },
      emailId: {
        type: String,
        required: true,
        unique: true
    },
      password: {
        type: String,
        required: true
    },
      confirmPassword: {
        type: String,
        required: true
    }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("User", userSchema);