const joi = require("@hapi/joi")
const schema = {
    createHostel: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().required(),
        roomNumber: joi.string().required(),
        floorNumber: joi.string().required()
    }),
    updateHostel: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().required(),
        roomNumber: joi.string().required(),
        floorNumber: joi.string().required()
    })
}
module.exports = schema