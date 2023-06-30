
const mongoose = require("mongoose");
const logger = require("../utils/logger");

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log("connected to mongodb"))
        .catch(err => console.error("failed to connect to mongodb", err))
}