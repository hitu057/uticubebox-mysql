const { createRoom, updateRoom, getAllRoom, deleteRoom, getRoomById } = require("./room.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createRoom: (req, res) => {
        const body = req?.body
        body.hostel = decrypt(body?.hostel)
        try {
            createRoom(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: "Room Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateRoom: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        body.hostel = decrypt(body?.hostel)
        if (id) {
            try {
                updateRoom(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Room Updated Successfully"
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
    deleteRoom: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                deleteRoom(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            success: true,
                            message: "Room Deleted Successfully"
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
    getRoomById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getRoomById(id, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id),hostel:encrypt(item?.hostel) }))
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
    getAllRoom: (req, res) => {
        const body = req?.body
        getAllRoom(body, (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result = result.map(item => ({ ...item, id: encrypt(item?.id),hostel:encrypt(item?.hostel) }))
                return res.status(200).json({
                    success: true,
                    message: result?.length ? "Data Found" : "No Data Found",
                    result: result
                })
            }
        })
    }
}