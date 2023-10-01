const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  password: { type: String },
  dob: { type: Date },
  image: {
    type: String
  },
});

module.exports = mongoose.model("users", userSchema);
