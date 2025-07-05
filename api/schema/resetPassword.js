const Joi = require("joi") ;

const schema = Joi.object({
    email : Joi.string().email().required(),
    newPassword : Joi.string().min(4).max(17).pattern(/^[a-zA-Z0-9]{3,12}$/).required(),
    confirmPassword : Joi.ref("newPassword")
})

module.exports = {
    forgetPassword_schema : schema
}