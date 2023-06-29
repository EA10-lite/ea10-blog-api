const Joi = require("joi");

const blog_schema = {
    title: Joi.string().min(5).max(250).required(),
    content: Joi.string().min(50).max(10000).required(),
    files: Joi.array().items(Joi.string().required()),
}

const comment_schema = {
    blog_id: Joi.objectId().required(),
    comment: Joi.string().min(1).max(1024).required()
}

const like_schema = {
    blog_id: Joi.objectId().required()
}

module.exports = {
    blog_schema,
    comment_schema,
    like_schema
}