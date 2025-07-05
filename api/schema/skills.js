const Joi = require("joi") ;

const schema = Joi.object({
    skill : Joi.string().min(4).max(25).pattern(/^[a-zA-Z ]$/).required(),
    skill1 : Joi.string().min(4).max(25).pattern(/^[a-zA-Z ]$/).required(),
    skill2 : Joi.string().min(4).max(25).pattern(/^[a-zA-Z ]$/).required(),
    skill3 : Joi.string().min(4).max(25).pattern(/^[a-zA-Z ]$/).required(),
    // when i didnt use parseInt and im depending on mysql to convert it into number
    // range : Joi.string().pattern(/^[0-5]$/).required(), 
    // range1 : Joi.string().pattern(/^[0-5]$/).required(),
    // range2 : Joi.string().pattern(/^[0-5]$/).required(), 
    // range3 : Joi.string().pattern(/^[0-5]$/).required(),
    range: Joi.number().integer().min(0).max(5).required(),
    range1: Joi.number().integer().min(0).max(5).required(),
    range2: Joi.number().integer().min(0).max(5).required(),
    range3: Joi.number().integer().min(0).max(5).required(),
})

module.exports = {
    skillSchema : schema
}