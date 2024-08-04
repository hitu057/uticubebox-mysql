const joi = require("@hapi/joi")
const manualAttendanceSchema = joi.object({
    userId:joi.string().required(),
    isPresent:joi.number().required(),
    remark:joi.string().allow('').allow(null)
})
const schema = {
    verifyFaculty: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        userId: joi.string().required(),
        classId: joi.string().required(),
        departmentId: joi.string().required(),
        semesterId: joi.string().required(),
        lectureDate: joi.date().required(),
        startTime:joi.string().required(),
        endTime:joi.string().required()
    }),
    startAttendance: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        userId: joi.string().required(),
        classId: joi.string().required(),
        departmentId: joi.string().required(),
        semesterId: joi.string().required(),
        lectureDate: joi.date().required(),
        startTime:joi.string().required(),
        endTime:joi.string().required(),
        glat:joi.string().required(),
        glong:joi.string().required()
    }),
    stopAttendance: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        userId: joi.string().required(),
        classId: joi.string().required(),
        departmentId: joi.string().required(),
        semesterId: joi.string().required(),
        lectureDate: joi.date().required(),
        startTime:joi.string().required(),
        endTime:joi.string().required()
    }),
    manualAttendance: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        timeTableId:joi.string().required(),
        studentData: joi.array().items(manualAttendanceSchema).required()
    }),
    autoAttendance: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        timeTableId:joi.string().required(),
        userId:joi.string().required()
    }),
    studentList: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        classId:joi.string().required(),
        semesterId:joi.string().required(),
        timeTableId:joi.string().required()
    })
}
module.exports = schema