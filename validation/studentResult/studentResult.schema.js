const joi = require("@hapi/joi")
const schema = {
    resultList: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        batchId: joi.string().required(),
        studentId: joi.string().required()
    }),
    studentList: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        batchId: joi.string().required()
    })
}
module.exports = schema