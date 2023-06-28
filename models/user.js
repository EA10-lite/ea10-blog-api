const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const user = new mongoose.Schema({
    avatar: { type: String, default: "https://random-img.jpg" },
    created_at: { type: Date, default: Date.now },
    email: { type: String, minLength: 4, maxLength: 50, required: true, unique: true },
    first_name: { type: String, minLength: 5, maxLength: 50 },
    last_name: { type: String, minLength: 5, maxLength: 50 },
    is_verified: { type: Boolean, default: false },
    password: { type: String, minlength: 8, maxLength: 1024, required: true },
    username: { type: String, minLength: 4, maxLength: 50, required: true, unique: true },
});

user.methods.generateAuthToken = function(){
    return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET_KEY);
}

const User = mongoose.model("User", user);

module.exports.User = User;