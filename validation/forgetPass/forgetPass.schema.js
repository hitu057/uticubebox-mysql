const joi = require("@hapi/joi")
const schema = {
    sendOtpValidation: joi.object({
        emailId: joi.string().required()
    })
}
module.exports = schema