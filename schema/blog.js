const Joi = require("joi");

const blog_schema = {
    created_by: Joi.objectId().required(),
    title: Joi.string().min(5).max(250).required(),
    description: Joi.string().min(50).max(10000).required()
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