const joi = require("@hapi/joi")
const schema = {
    createLogBook: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        studentId: joi.string().required(),
        classId: joi.string().required(),
        departmentId: joi.string().required(),
        semesterId: joi.string().required(),
        batchId: joi.string().required(),
        competency: joi.string().required(),
        activityName: joi.string().required(),
        activityAttempt: joi.string().required(),
        rating: joi.string().required(),
        facultyDecision: joi.string().required(),
        feedback: joi.string().allow(null).allow(''),
        facultyInitialDate: joi.string().allow(null).allow(''),
        logDate: joi.date().required()
    }),
    updateLogBook: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        studentId: joi.string().required(),
        classId: joi.string().required(),
        departmentId: joi.string().required(),
        semesterId: joi.string().required(),
        batchId: joi.string().required(),
        competency: joi.string().required(),
        activityName: joi.string().required(),
        activityAttempt: joi.string().required(),
        rating: joi.string().required(),
        facultyDecision: joi.string().required(),
        feedback: joi.string().allow(null).allow(''),
        facultyInitialDate: joi.string().allow(null).allow(''),
        logDate: joi.date().required()
    })
}
module.exports = schema