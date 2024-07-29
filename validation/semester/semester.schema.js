const joi = require("@hapi/joi")
const schema = {
    createSemester: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().allow('').allow(null),
        holidayDate: joi.date().required()
    }),
    updateSemester: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().allow('').allow(null),
        holidayDate: joi.date().required()
    })
}
module.exports = schema