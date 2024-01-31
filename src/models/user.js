const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'moderator'], required: true },
  password: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
