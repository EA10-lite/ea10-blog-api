const Joi = require("joi");

module.exports = ()=>{
    Joi.objectid = require("joi-objectid")(Joi);
}

