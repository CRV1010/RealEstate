const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members : { type: Array, required: true }
});

module.exports = mongoose.model("conversation", conversationSchema);
