const joi = require("@hapi/joi")
const schema = {
    createEvent: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().allow('').allow(null),
        startDate: joi.date().required(),
        endDate: joi.date().required(),
        showDashboard: joi.number().required()
    }),
    updateEvent: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().allow('').allow(null),
        startDate: joi.date().required(),
        endDate: joi.date().required(),
        showDashboard: joi.number().required()
    })
}
module.exports = schema