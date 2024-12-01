const { createAttendanceTimeTable, updateAttendanceTimeTable, getAllAttendanceTimeTable, deleteAttendanceTimeTable, getAttendanceTimeTableById } = require("./attendanceTimeTable.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createAttendanceTimeTable: (req, res) => {
        const body = req?.body
        try {
            body.departmentId = decrypt(body?.departmentId)
            body.userId = decrypt(body?.userId)
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            body.batchId = decrypt(body?.batchId)
            createAttendanceTimeTable(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Attendance Time Table Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateAttendanceTimeTable: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.departmentId = decrypt(body?.departmentId)
                body.userId = decrypt(body?.userId)
                body.semesterId = decrypt(body?.semesterId)
                body.classId = decrypt(body?.classId)
                body.batchId = decrypt(body?.batchId)
                updateAttendanceTimeTable(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Attendance Time Table Updated Successfully"
                        })
                    }
                })
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Bad Request"
                })
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    deleteAttendanceTimeTable: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteAttendanceTimeTable(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Attendance Time Table Deleted Successfully"
                        })
                    }
                })
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Bad Request"
                })
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    getAttendanceTimeTableById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getAttendanceTimeTableById(id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id),userId:encrypt(item?.userId),semesterId:encrypt(item?.semesterId),classId:encrypt(item?.classId),departmentId:encrypt(item?.departmentId),batchId:encrypt(item?.batchId) }))
                    return res.status(200).json({
                        success: true,
                        message: result?.length ? "Data Found" : "No Data Found",
                        result: result?.length ? result?.[0] : result
                    })
                }
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    getAllAttendanceTimeTable: (req, res) => {
        const body = req?.body
        getAllAttendanceTimeTable(body,(error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result = result.map(item => ({ ...item, id: encrypt(item?.id),classId:encrypt(item?.classId),departmentId:encrypt(item?.departmentId),semesterId:encrypt(item?.semesterId) }))
                return res.status(200).json({
                    success: true,
                    message: result?.length ? "Data Found" : "No Data Found",
                    result: result
                })
            }
        })
    }
}