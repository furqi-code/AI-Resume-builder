const Joi = require("joi") ;

const schema = Joi.array().items(
    Joi.object({
        company : Joi.string().min(4).max(50).pattern(/^[a-zA-Z ]$/).required(),
        discription : Joi.string().pattern(/^[a-zA-Z ]+$/).required(),
        startDate : Joi.date().iso().required(), 
        endDate : Joi.date().iso().greater(Joi.ref("startDate")), 
    })
)

module.exports = {
    workExpSchema : schema
}