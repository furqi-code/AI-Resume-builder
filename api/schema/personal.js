const Joi = require("joi") ;

const schema = Joi.object({
    username : Joi.string().min(4).max(50).pattern(/^[a-zA-Z ]$/).required(),
    gmail : Joi.string().email().required(),
    linkedin : Joi.string().pattern(/^[a-zA-Z ]+$/).required(), 
    github : Joi.string().pattern(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/).required(), 
    gender : Joi.string().pattern(/^(Male|Female|M|F)$/i).required(), 
    phoneNumber : Joi.string().pattern(/^[1-9][0-9]{9}$/).required()
})

module.exports = {
    personalSchema : schema
}