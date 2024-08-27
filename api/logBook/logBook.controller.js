const { createLogBook, updateLogBook, getAllLogBook, deleteLogBook, getLogBookById } = require("./logBook.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createLogBook: (req, res) => {
        const body = req?.body
        try {
            body.semesterId = decrypt(body?.semesterId)
            body.studentId = decrypt(body?.studentId)
            body.batchId = decrypt(body?.batchId)
            body.departmentId = decrypt(body?.departmentId)
            body.classId = decrypt(body?.classId)
            createLogBook(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "LogBook Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateLogBook: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.semesterId = decrypt(body?.semesterId)
                body.studentId = decrypt(body?.studentId)
                body.batchId = decrypt(body?.batchId)
                body.departmentId = decrypt(body?.departmentId)
                body.classId = decrypt(body?.classId)
                updateLogBook(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "LogBook Updated Successfully"
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
    deleteLogBook: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteLogBook(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "LogBook Deleted Successfully"
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
    getLogBookById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getLogBookById(id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id), semesterId: encrypt(item?.semesterId), classId: encrypt(item?.classId),studentId:encrypt(item?.studentId),batchId:encrypt(item?.batchId),departmentId:encrypt(item?.departmentId) }))
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
    getAllLogBook: (req, res) => {
        const body = req?.body
        getAllLogBook(body, (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result = result.map(item => ({ ...item, id: encrypt(item?.id), semesterId: encrypt(item?.semesterId), classId: encrypt(item?.classId),studentId:encrypt(item?.studentId),departmentId:encrypt(item?.departmentId) }))
                return res.status(200).json({
                    success: true,
                    message: result?.length ? "Data Found" : "No Data Found",
                    result: result
                })
            }
        })
    }
}