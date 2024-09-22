const { createExamTimeTable, updateExamTimeTable, getAllExamTimeTable, deleteExamTimeTable, getExamTimeTableById } = require("./examTimeTable.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createExamTimeTable: (req, res) => {
        const body = req?.body
        try {
            body.departmentId = decrypt(body?.departmentId)
            body.userId = decrypt(body?.userId)
            body.semesterId = decrypt(body?.semesterId)
            body.batchId = decrypt(body?.batchId)
            body.classId = decrypt(body?.classId)
            createExamTimeTable(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Exam Time Table Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateExamTimeTable: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.departmentId = decrypt(body?.departmentId)
                body.userId = decrypt(body?.userId)
                body.semesterId = decrypt(body?.semesterId)
                body.batchId = decrypt(body?.batchId)
                body.classId = decrypt(body?.classId)
                updateExamTimeTable(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Exam Time Table Updated Successfully"
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
    deleteExamTimeTable: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteExamTimeTable(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Exam Time Table Deleted Successfully"
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
    getExamTimeTableById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getExamTimeTableById(id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id),userId:encrypt(item?.userId),semesterId:encrypt(item?.semesterId),classId:encrypt(item?.classId),departmentId:encrypt(item?.departmentId),batchId:encrypt(item?.batchId)}))
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
    getAllExamTimeTable: (req, res) => {
        const body = req?.body
        getAllExamTimeTable(body,(error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result = result.map(item => ({ ...item, id: encrypt(item?.id) }))
                return res.status(200).json({
                    success: true,
                    message: result?.length ? "Data Found" : "No Data Found",
                    result: result
                })
            }
        })
    }
}