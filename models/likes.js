const mongoose = require("mongoose");

const likes = new mongoose.Schema({
    like_by: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

module.exports = likes;