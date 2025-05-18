const { createFaculty, updateFaculty, getAllFaculty, deleteFaculty, getFacultyById, uploadImage } = require("./faculty.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createFaculty: (req, res) => {
        const body = req?.body
        try {
            let additionalResDecry = []
            let qualificationDecry = []
            body.gender = decrypt(body?.gender)
            body.departmentId = decrypt(body?.departmentId)
            body.roleId = decrypt(body?.roleId)
            body.password = encrypt(body?.password)
            body.designationId = decrypt(body?.designationId)
            const additionalRes = body?.designationId.split(',')
            additionalResDecry = additionalRes.map(element => {
                return decrypt(element)
            })
            const qualification = body?.qualificationId.split(',')
            qualificationDecry = qualification.map(element => {
                return decrypt(element)
            })
            body.additionalResId = additionalResDecry.length > 0 ? additionalResDecry.join(',') : ''
            body.qualificationId = qualificationDecry.length > 0 ? qualificationDecry.join(',') : ''
            createFaculty(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Faculty Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateFaculty: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                let additionalResDecry = []
                let qualificationDecry = []
                body.gender = decrypt(body?.gender)
                body.departmentId = decrypt(body?.departmentId)
                body.designationId = decrypt(body?.designationId)
                body.roleId = decrypt(body?.roleId)
                body.password = body?.password ? encrypt(body?.password) : ""
                const additionalRes = body?.designationId.split(',')
                additionalResDecry = additionalRes.map(element => {
                    return decrypt(element)
                })
                const qualification = body?.qualificationId.split(',')
                qualificationDecry = qualification.map(element => {
                    return decrypt(element)
                })
                body.additionalResId = additionalResDecry.length > 0 ? additionalResDecry.join(',') : ''
                body.qualificationId = qualificationDecry.length > 0 ? qualificationDecry.join(',') : ''
                updateFaculty(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Faculty Updated Successfully"
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
    deleteFaculty: (req, res) => {
        const id = decrypt(req?.params?.id)
        const data = req?.body
        if (id) {
            try {
                deleteFaculty(data, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Faculty Deleted Successfully"
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
    getFacultyById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getFacultyById(id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result = result.map(item => ({ 
                        ...item, 
                        id: encrypt(item?.id), 
                        roleId: encrypt(item?.roleId),
                        additionalResId: (item?.additionalResId)?.split(',').map(item => encrypt(item)).join(','), 
                        qualificationId: (item?.qualificationId)?.split(',').map(item => encrypt(item)).join(','), 
                        designationId: encrypt(item?.designationId), 
                        departmentId: encrypt(item?.departmentId), 
                        gender: encrypt(item?.gender),
                        profile: item?.profile ? `${process.env.USERIMAGE}${item?.profile}` : null 
                    }))
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
    getAllFaculty: (req, res) => {
        const body = req?.body
        getAllFaculty(body, (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result = result.map(item => ({ ...item, departmentId: encrypt(item?.departmentId), designationId: encrypt(item?.designationId), id: encrypt(item?.id), profile: item?.profile ? `${process.env.USERIMAGE}${item?.profile}` : null }))
                return res.status(200).json({
                    success: true,
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
            uploadImage(body, id, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    return res.status(200).json({
                        success: true,
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