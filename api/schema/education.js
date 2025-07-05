const Joi = require("joi") ;

const schema = Joi.object({
    degree : Joi.string().min(2).max(50).pattern(/^[a-zA-Z ]+$/).required(), 
    start : Joi.date().iso().required(), 
    end : Joi.date().iso().greater(Joi.ref("start")), 
    percentage : Joi.string().pattern(/^(100|[1-9]?[0-9])%$/).required()
})

module.exports = {
    educationSchema : schema
}