const { createDepartment, updateDepartment, getAllDepartment, deleteDepartment, getDepartmentById } = require("./department.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createDepartment: (req, res) => {
        const body = req?.body
        try {
            body.semesterId = decrypt(body?.semesterId)
            body.departmentId = decrypt(body?.departmentId)
            body.batchId = decrypt(body?.batchId)
            createDepartment(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Department Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateDepartment: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.semesterId = decrypt(body?.semesterId)
                body.departmentId = decrypt(body?.departmentId)
                body.batchId = decrypt(body?.batchId)
                updateDepartment(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Department Updated Successfully"
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
    deleteDepartment: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteDepartment(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Department Deleted Successfully"
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
    getDepartmentById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getDepartmentById(id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id),batchId:encrypt(item?.batchId),semesterId:encrypt(item?.semesterId),departmentId:encrypt(item?.departmentId) }))
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
    getAllDepartment: (req, res) => {
        const body = req?.body
        getAllDepartment(body, (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result = result.map(item => ({ ...item, id: encrypt(item?.id),batchId:encrypt(item?.batchId),semesterId:encrypt(item?.semesterId),departmentId:encrypt(item?.departmentId) }))
                return res.status(200).json({
                    success: true,
                    message: result?.length ? "Data Found" : "No Data Found",
                    result: result
                })
            }
        })
    }
}