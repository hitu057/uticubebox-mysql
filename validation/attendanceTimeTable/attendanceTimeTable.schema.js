const joi = require("@hapi/joi")
const schema = {
    createAttendanceTimeTable: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        userId: joi.string().required(),
        classId: joi.string().required(),
        departmentId: joi.string().required(),
        lectureDate: joi.date().required(),
        startTime:joi.string.required(),
        endTime:joi.string.required()
    }),
    updateAttendanceTimeTable: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        userId: joi.string().required(),
        classId: joi.string().required(),
        departmentId: joi.string().required(),
        lectureDate: joi.date().required(),
        startTime:joi.string.required(),
        endTime:joi.string.required()
    })
}
module.exports = schema