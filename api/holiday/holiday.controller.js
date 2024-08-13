const { createHoliday, updateHoliday, getAllHoliday, deleteHoliday, getHolidayById } = require("./holiday.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createHoliday: (req, res) => {
        const body = req?.body
        try {
            createHoliday(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Holiday Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateHoliday: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                updateHoliday(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Holiday Updated Successfully"
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
    deleteHoliday: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteHoliday(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Holiday Deleted Successfully"
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
    getHolidayById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getHolidayById(id, (error, result) => {
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
    getAllHoliday: (req, res) => {
        const body = req?.body
        getAllHoliday(body,(error, result) => {
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