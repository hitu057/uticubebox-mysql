const joi = require("@hapi/joi")
const schema = {
    createCourse: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().allow(null).allow(''),
        lab: joi.string().allow(null).allow(''),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        departmentId: joi.string().required(),
        document: joi.string().allow(null).allow('')
    }),
    updateCourse: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().allow(null).allow(''),
        lab: joi.string().allow(null).allow(''),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        departmentId: joi.string().required(),
        document: joi.string().allow(null).allow('')
    })
}
module.exports = schema