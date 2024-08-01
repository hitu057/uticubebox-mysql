const joi = require("@hapi/joi")
const schema = {
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
        orgId: joi.string().required(),
        deviceId: joi.string().required()
    }),
}
module.exports = schema