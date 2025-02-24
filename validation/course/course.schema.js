const joi = require("@hapi/joi")
const schema = {
    createCourse: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().required(),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        departmentId: joi.string().required()
    }),
    updateCourse: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title: joi.string().required(),
        description: joi.string().required(),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        departmentId: joi.string().required()
    })
}
module.exports = schema