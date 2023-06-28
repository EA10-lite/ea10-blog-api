const mongoose = require("mongoose");

const comments = new mongoose.Schema({
    comment_by: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

module.exports = comments;