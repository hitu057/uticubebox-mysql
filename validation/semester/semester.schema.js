const joi = require("@hapi/joi")
const schema = {
    createSemester: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        name: joi.string().required(),
        classId: joi.string().required()
    }),
    updateSemester: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        name: joi.string().required(),
        classId: joi.string().required()
    })
}
module.exports = schema