const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: { type: String, required: true },
  senderId: { type: String },
  message: { type: String },
});

module.exports = mongoose.model("messages", messageSchema);
