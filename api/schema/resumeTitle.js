const Joi = require('joi') ;

const schema = Joi.object({
    title : Joi.string().min(4).max(25).required()
})

module.exports = {
    resumeSchema : schema
}