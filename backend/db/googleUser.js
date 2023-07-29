const mongoose = require("mongoose")

const google_userSchema = new mongoose.Schema({
    username : String,
    email : String
})

module.exports = mongoose.model("google-user",google_userSchema)