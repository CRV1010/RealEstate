const mongoose = require("mongoose");

const userComment = new mongoose.Schema({
  uid: { type: String},
  comment : { type: String }
});

module.exports = mongoose.model("comment", userComment);
