const mongoose = require("mongoose");
const comments = require("./comments");
const likes = require("./likes");

const blog = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    created_by: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, minLength: 5, maxLength: 250, required: true },
    content: { type: String, minLength: 50, maxLength: 10000, required: true },
    media: [{ url: { type: String, required: true } }],
    likes: [likes],
    comments: [comments],

});
const Blog = mongoose.model("Blog", blog);

module.exports.Blog = Blog;