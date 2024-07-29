const { createStudent, updateStudent, getAllStudent, deleteStudent, getStudentById,uploadImage } = require("./student.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createStudent: (req, res) => {
        const body = req?.body
        try {
            body.gender = decrypt(body?.gender)
            body.categoryId = decrypt(body?.categoryId)
            body.batchId = decrypt(body?.batchId)
            body.password = encrypt(body?.password)
            createStudent(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    status: true,
                    message: "Student Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateStudent: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.gender = decrypt(body?.gender)
                body.categoryId = decrypt(body?.categoryId)
                body.password = body?.password ? encrypt(body?.password) : ""
                updateStudent(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            status: true,
                            message: "Student Updated Successfully"
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
    deleteStudent: (req, res) => {
        const id = decrypt(req?.params?.id)
        const data = req?.body
        if (id) {
            try {
                deleteStudent(data, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            status: true,
                            message: "Student Deleted Successfully"
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
    getStudentById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getStudentById(id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id),gender:encrypt(item?.gender),categoryId:encrypt(item?.categoryId) }))
                    return res.status(200).json({
                        status: true,
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
    getAllStudent: (req, res) => {
        const body = req?.body
        getAllStudent(body,(error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result = result.map(item => ({ ...item, id: encrypt(item?.id) }))
                return res.status(200).json({
                    status: true,
                    message: result?.length ? "Data Found" : "No Data Found",
                    result: result
                })
            }
        })
    },
    uploadImage: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        body.profile = req?.file?.filename
        try {
            uploadImage(body,id, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    return res.status(200).json({
                        status: true,
                        message: "Faculty image uploaded sucessfully"
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
}