const { createCourse, updateCourse, getAllCourse, deleteCourse, getCourseById } = require("./course.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createCourse: (req, res) => {
        const body = req?.body
        try {
            body.classId = decrypt(body?.classId)
            body.semesterId = decrypt(body?.semesterId)
            body.departmentId = decrypt(body?.departmentId)
            createCourse(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Course Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateCourse: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.classId = decrypt(body?.classId)
                body.semesterId = decrypt(body?.semesterId)
                body.departmentId = decrypt(body?.departmentId)
                updateCourse(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Course Updated Successfully"
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
    deleteCourse: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteCourse(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Course Deleted Successfully"
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
    getCourseById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getCourseById(id, (error, result) => {
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
    getAllCourse: (req, res) => {
        const body = req?.body
        getAllCourse(body, (error, result) => {
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