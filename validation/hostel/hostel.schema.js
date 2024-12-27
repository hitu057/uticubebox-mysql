const joi = require("@hapi/joi")
const schema = {
    createHostel: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        name: joi.string().required(),
        warden: joi.string().required(),
        address: joi.string().required(),
        pincode: joi.string().required(),
        city:joi.string().required(),
        state:joi.string().required(),
        policy:joi.string().allow('').allow(null),
        emergency:joi.number().required()
    }),
    updateHostel: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        name: joi.string().required(),
        warden: joi.string().required(),
        address: joi.string().required(),
        pincode: joi.string().required(),
        city:joi.string().required(),
        state:joi.string().required(),
        policy:joi.string().allow('').allow(null),
        emergency:joi.number().required()
    })
}
module.exports = schema