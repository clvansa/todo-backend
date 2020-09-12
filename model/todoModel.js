const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    createdAt: { type: Date, default: Date.now() },
    completed: { type: Boolean, default: false },
    property: { type: String, default: "mid" },
    uid: String

})

module.exports = mongoose.model("todo", todoSchema);