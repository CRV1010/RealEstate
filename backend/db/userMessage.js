const mongoose = require("mongoose");

const userMsgSchema = new mongoose.Schema({
  username: { type: String},
  email: { type: String},
  message: { type: String }
});

module.exports = mongoose.model("userMessages", userMsgSchema);
