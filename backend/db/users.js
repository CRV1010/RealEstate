const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    phone : Number,
    password : String
})

module.exports = mongoose.model("users",userSchema)