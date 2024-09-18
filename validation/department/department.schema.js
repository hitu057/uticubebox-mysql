const joi = require("@hapi/joi")
const schema = {
    createDepartment: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        batchId: joi.string().required(),
        semesterId: joi.string().required(),
        departmentId: joi.string().required()
    }),
    updateDepartment: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        batchId: joi.string().required(),
        semesterId: joi.string().required(),
        departmentId: joi.string().required()
    })
}
module.exports = schema