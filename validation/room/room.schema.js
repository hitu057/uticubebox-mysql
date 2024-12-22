const joi = require("@hapi/joi")
const schema = {
    createRoom: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        hostel: joi.string().required(),
        sharing: joi.number().required(),
        roomNumber: joi.string().required(),
        preference: joi.string().required()
    }),
    updateRoom: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        hostel: joi.string().required(),
        sharing: joi.number().required(),
        roomNumber: joi.string().required(),
        preference: joi.string().required()
    })
}
module.exports = schema