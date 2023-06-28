const Joi = require("joi")

const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'info', 'io']}}).min(5).max(50).required();
const password = Joi.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/).max(255).required();
const username = Joi.string().min(4).max(50).required();

const login_schema = {
    username,
    password,
}

const register_schema = {
    email,
    username,
    password,
}

const set_password_schema = {
    password,
}

const auth = {
    login_schema,
    register_schema,
    set_password_schema,
}

module.exports = auth;