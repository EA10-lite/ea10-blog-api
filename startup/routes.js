
const express = require("express");
const auth = require("../routes/auth");
const blog = require("../routes/blog");
const main  = require("../routes/app");

module.exports = function(app){
    app.use(express.json());
    app.use("/api/auth", auth);
    app.use("/api/blogs",blog);
    app.use("/api", main);
}