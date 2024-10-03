const joi = require("@hapi/joi")
const examAttendanceSchema = joi.object({
    userId:joi.string().required(),
    isPresent:joi.number().required()
})
const schema = {
    studentList: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        batchId: joi.string().required()
    }),
    generateHallTicket: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        batchId: joi.string().required(),
        studentId: joi.string().required(),
        venue: joi.string().required()
    }),
    examAttendance: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        timeTableId:joi.string().required(),
        studentData: joi.array().items(examAttendanceSchema).required()
    }),
    studentListForAttendance: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        classId:joi.string().required(),
        semesterId:joi.string().required()
    }),
    viewHallTicket: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        classId:joi.string().required(),
        batchId:joi.string().required(),
        semesterId:joi.string().required(),
        studentId:joi.string().required()
    }),
}
module.exports = schema