const Joi = require("joi") ;

const schema = Joi.object({
    email : Joi.string().email().required() ,
    pass : Joi.string().min(3).max(12).required()
})

module.exports = {
    signinSchema : schema
}