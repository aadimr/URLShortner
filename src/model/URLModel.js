const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  urlCode: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },

}, { timestamps: true });

module.exports = mongoose.model("Url", urlSchema);