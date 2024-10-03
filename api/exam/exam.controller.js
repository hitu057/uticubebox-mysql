const { studentList, generateHallTicket, examAttendance, studentListForAttendance,viewHallTicket } = require("./exam.service")
const { decrypt, encrypt } = require("../../enc_dec")
module.exports = {
    studentList: (req, res) => {
        const body = req?.body
        try {
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            body.batchId = decrypt(body?.batchId)
            studentList(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                result = result.map(item => ({ ...item, id: encrypt(item?.id), hallTicket: encrypt(item?.hallTicket) }))
                return res.status(200).json({
                    success: true,
                    message: "Student List",
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
    generateHallTicket: (req, res) => {
        const body = req?.body
        try {
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            body.batchId = decrypt(body?.batchId)
            body.studentId = decrypt(body?.studentId)
            generateHallTicket(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Hall Ticket Generated Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    studentListForAttendance: (req, res) => {
        const body = req?.body
        try {
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            studentListForAttendance(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                result = result?.map(item => ({ ...item, id: encrypt(item?.id), profile: item?.profile ? `${process.env.USERIMAGE}${item?.profile}` : null }))
                return res.status(200).json({
                    success: true,
                    message: "Student List",
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
    viewHallTicket: (req, res) => {
        const body = req?.body
        try {
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            body.batchId = decrypt(body?.batchId)
            body.studentId = decrypt(body?.studentId)
            viewHallTicket(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                result = result?.map(item => ({ ...item, id: encrypt(item?.id),departmentId:encrypt(item?.departmentId), profile: item?.profile ? `${process.env.USERIMAGE}${item?.profile}` : null }))
                return res.status(200).json({
                    success: true,
                    message: "Hall Ticket",
                    result: result ? result?.[0] : []
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    examAttendance: (req, res) => {
        const body = req?.body
        try {
            const orgId = body?.orgId
            const timeTableId = decrypt(body?.timeTableId)
            body?.studentData.forEach(student => {
                student.userId = decrypt(student?.userId)
                examAttendance(orgId, timeTableId, student, (err, result) => {
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
    }
}