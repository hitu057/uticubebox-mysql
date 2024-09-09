const joi = require("@hapi/joi")
const schema = {
    createEvent: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().allow('').allow(null),
        startDate: joi.date().required(),
        endDate: joi.date().required()
    }),
    updateEvent: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().allow('').allow(null),
        startDate: joi.date().required(),
        endDate: joi.date().required()
    })
}
module.exports = schema