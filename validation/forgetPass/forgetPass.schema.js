const joi = require("@hapi/joi")
const schema = {
    sendOtp: joi.object({
        emailId: joi.string().required()
    }),
    verifyOtp: joi.object({
        emailId: joi.string().required(),
        otp: joi.string().required()
    }),
    changePass: joi.object({
        emailId: joi.string().required(),
        password: joi.string().required()
    })
}
module.exports = schema