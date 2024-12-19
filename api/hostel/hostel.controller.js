const { createHostel, updateHostel, getAllHostel, deleteHostel, getHostelById } = require("./hostel.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createHostel: (req, res) => {
        const body = req?.body
        try {
            createHostel(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Hostel Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateHostel: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                updateHostel(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Hostel Updated Successfully"
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
    deleteHostel: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteHostel(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Hostel Deleted Successfully"
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
    getHostelById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getHostelById(id, (error, result) => {
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
    getAllHostel: (req, res) => {
        const body = req?.body
        getAllHostel(body, (error, result) => {
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