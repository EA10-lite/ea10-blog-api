
const mongoose = require("mongoose");
const logger = require("../utils/logger");

module.exports = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(()=> logger.log("connected to mongodb"))
        .catch(err => logger.error("failed to connect to mongodb", err))
}