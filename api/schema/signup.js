const Joi = require('joi');

const schema = Joi.object({
    name : Joi.string().min(4).max(17).required() ,
    pass : Joi.string().min(3).max(12).required() ,
    email : Joi.string().email().required() 
})

module.exports = {
    signUpschema : schema
}