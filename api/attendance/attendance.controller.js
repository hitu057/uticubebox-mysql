const { verifyFaculty, startAttendance, stopAttendance, markAttendance, studentList, verifyStudent, viewAttendance,viewSingleAttendance } = require("./attendance.service")
const { decrypt, encrypt } = require("../../enc_dec")
module.exports = {
    verifyFaculty: (req, res) => {
        const body = req?.body
        try {
            body.departmentId = decrypt(body?.departmentId)
            body.userId = decrypt(body?.userId)
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            body.password = encrypt(body?.password)
            verifyFaculty(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                if (result?.length && result?.[0]?.id) {
                    return res.status(200).json({
                        success: true,
                        message: "Faculty Verified Successfully"
                    })
                }
                return res.status(500).json({
                    success: false,
                    message: "Faculty not verified"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    startAttendance: (req, res) => {
        const body = req?.body
        try {
            body.departmentId = decrypt(body?.departmentId)
            body.userId = decrypt(body?.userId)
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            startAttendance(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: (result?.length && result?.[0]?.id) ? "Attendance Already started" : "Attendance started successfully",
                    result: (result?.length && result?.[0]?.id) ? encrypt(result?.[0]?.uniqueId) : encrypt(result?.uniqueId)
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    stopAttendance: (req, res) => {
        const body = req?.body
        try {
            body.departmentId = decrypt(body?.departmentId)
            body.userId = decrypt(body?.userId)
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            stopAttendance(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: (result?.length && result?.[0]?.id) ? "Attendance Already stopped" : "Attendance stopped successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    manualAttendance: (req, res) => {
        const body = req?.body
        try {
            const orgId = body?.orgId
            const timeTableId = decrypt(body?.timeTableId)
            body?.studentData.forEach(student => {
                student.userId = decrypt(student?.userId)
                markAttendance(orgId, timeTableId, student, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                })
            })
            return res.status(200).json({
                success: true,
                message: "Attendance marked successfully"
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    autoAttendance: (req, res) => {
        const body = req?.body
        try {
            const timeTableId = decrypt(body?.timeTableId)
            const studentData = {
                userId: decrypt(body?.userId),
                isPresent: 1,
                remark: ""
            }
            markAttendance(body?.orgId, timeTableId, studentData, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Attendance marked successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    studentList: (req, res) => {
        const body = req?.body
        try {
            body.classId = decrypt(body?.classId)
            body.semesterId = decrypt(body?.semesterId)
            body.timeTableId = decrypt(body?.timeTableId)
            studentList(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                result = result.map(item => ({ ...item, id: encrypt(item?.id), profile: item?.profile ? `${process.env.USERIMAGE}${item?.profile}` : null }))
                return res.status(200).json({
                    success: true,
                    message: "Student Data",
                    result: result
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    verifyStudent: (req, res) => {
        const body = req?.body
        try {
            body.departmentId = decrypt(body?.departmentId)
            body.userId = decrypt(body?.userId)
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            body.password = encrypt(body?.password)
            verifyStudent(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                if (result?.length && result?.[0]?.id) {
                    return res.status(200).json({
                        success: true,
                        message: "Student Verified Successfully"
                    })
                }
                return res.status(500).json({
                    success: false,
                    message: "Student not verified"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    viewAttendance: (req, res) => {
        const body = req?.body
        try {
            body.departmentId = decrypt(body?.departmentId)
            body.userId = decrypt(body?.userId)
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            viewAttendance(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                result = result.map(item => ({ ...item, id: encrypt(item?.id) }))
                return res.status(200).json({
                    success: true,
                    message: "Attendance data",
                    result: result
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    viewSingleAttendance: (req, res) => {
        const body = req?.body
        try {
            body.departmentId = decrypt(body?.departmentId)
            body.userId = decrypt(body?.userId)
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            viewSingleAttendance(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                result = result.map(item => ({ ...item, id: encrypt(item?.id) }))
                return res.status(200).json({
                    success: true,
                    message: "Attendance data",
                    result: result
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    }
}