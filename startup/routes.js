
const express = require("express");
const main  = require("../routes/app");
const auth = require("../routes/auth");

module.exports = function(app){
    app.use(express.json());
    app.use("/api", main)
    app.use("/api/auth", auth);
}