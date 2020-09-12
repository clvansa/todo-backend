const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username:String,
    createdAt: { type: Date, default: Date.now() },
    userImage: { type: String, default: "" }
})

module.exports = mongoose.model('user', userSchema);
