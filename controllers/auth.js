const { User } = require("../models/user");
const { hash_password, verify_password } = require("../utils/hashing");
const transport = require("../utils/transport");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const login = async(req, res)=> {
    const user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(400).send({ data: null, message: "Incorrect login details", success: false });

    const is_correct_password = await verify_password(req.body.password, user.password);
    if(!is_correct_password) return res.status(400).send({ data: null, message: "Incorrect password!", success: false });

    const token = user.generateAuthToken();
    res.status(200).send({
        data: token,
        message: "login successful",
        success: true
    });
};

const register = async(req, res)=> {
    let user = await User.findOne().or({ email: req.body.email}, { username: req.body.username });
    if(user) return res.status(400).send({ message: "User already exist with email or password", success: false });

    user = new User({ ...req.body });
    user.password = await hash_password(user.password);

    // send verification mail
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
    const mail_options = {
        from: process.env.GMAIL_USERNAME,
        to: user.email,
        subject: 'Verify Account',
        html: `<p>Please click <a href="http://localhost:3000/account-verify/${token}">here</a> to verify your account.</p>`,
    };

    await transport.sendMail(mail_options);
    await user.save();

    res.status(201).send({
        data: _.pick(user, ['email', 'username']),
        message: "Account successfully created. Please check your Email to verify your account.",
        success: true,
    });
};

const reset_password = async(req, res)=> {
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(404).send({
        success: false,
        message: "This email is not registered."
    });

    // send verification mail
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
    const mail_options = {
        from: process.env.GMAIL_USERNAME,
        to: user.email,
        subject: 'Password Reset Mail',
        html: `<p>Please click <a href="http://localhost:3000/reset_password/${token}">here</a> to reset password. </p>`,
    };

    await transport.sendMail(mail_options);

    res.status(200).send({
        data: null,
        message: "Password reset link sent to your email.",
        success: true
    })
};

const set_new_password = async(req, res)=> { 
    const user = await User.findById({ _id: req.user._id });
    if(!user) return res.status(404).send({ data: null, message: "user not recognized", success: false });

    user.password = await hash_password(req.body.password);
    await user.save();

    res.status({
        data: "",
        message: "user password changed!",
        success: true
    })
};

const verify_account = async(req, res)=> {
    const user = await User.findOne({ email: req.user.email });
    if(!user) return res.status(404).send({ data: null, message: "user not recognized", success: false });

    user.is_verified = true
    await user.save();

    res.status({
        data: _.pick(user, ['email']),
        message: "account verification successful.",
        success: true
    });
};

module.exports = {
    login,
    register,
    reset_password,
    set_new_password,
    verify_account,
}