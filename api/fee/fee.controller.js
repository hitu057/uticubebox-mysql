const { createFee, updateFee, getAllFee, deleteFee, getFeeById,addOnlinePayment, addOfflinePayment,pendingForApproval,approvePayment,rejectPayment,studentFee } = require("./fee.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createFee: (req, res) => {
        const body = req?.body
        try {
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            createFee(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Fee Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateFee: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.semesterId = decrypt(body?.semesterId)
                body.classId = decrypt(body?.classId)
                updateFee(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Fee Updated Successfully"
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
    deleteFee: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteFee(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Fee Deleted Successfully"
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
    getFeeById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getFeeById(id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id),semesterId:encrypt(item?.semesterId),classId:encrypt(item?.classId) }))
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
    getAllFee: (req, res) => {
        const body = req?.body
        getAllFee(body,(error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result = result.map(item => ({ ...item, id: encrypt(item?.id),classId:encrypt(item?.classId),semesterId:encrypt(item?.semesterId) }))
                return res.status(200).json({
                    success: true,
                    message: result?.length ? "Data Found" : "No Data Found",
                    result: result
                })
            }
        })
    },
    addOnlinePayment: (req, res) => {
        const body = req?.body
        try {
            body.feeId = decrypt(body?.feeId)
            addOnlinePayment(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Payment Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    addOfflinePayment: (req, res) => {
        const body = req?.body
        try {
            body.feeId = decrypt(body?.feeId)
            body.document = req?.file?.filename
            addOfflinePayment(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "Payment Added Successfully"
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    pendingForApproval: (req, res) => {
        const body = req?.body
        try {
            pendingForApproval(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id),classId:encrypt(item?.classId),semesterId:encrypt(item?.semesterId),document: item?.document ? `${process.env.PAYMENTIMAGE}${item?.document}` : null }))
                    return res.status(200).json({
                        success: true,
                        message: "Offline Payment Data",
                        data:result
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    approvePayment: (req, res) => {
        const body = req?.body
        try {
            body.id = decrypt(body?.id)
            approvePayment(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "Payment Approved Successfully",
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    rejectPayment: (req, res) => {
        const body = req?.body
        try {
            body.id = decrypt(body?.id)
            rejectPayment(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "Payment Rejected Successfully",
                    })
                }
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    studentFee: (req, res) => {
        const body = req?.body
        try {
            body.classId = decrypt(body?.classId)
            body.semesterId = decrypt(body?.semesterId)
            studentFee(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id) }))
                    return res.status(200).json({
                        success: true,
                        message: "Student Fee Data",
                        data:result
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