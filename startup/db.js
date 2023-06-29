
const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect(process.env.MONGO_REMOTE_URI)
        .then(()=> console.log("connected to mongodb"))
        .catch(err => console.error("failed to connect to mongodb", err))
}