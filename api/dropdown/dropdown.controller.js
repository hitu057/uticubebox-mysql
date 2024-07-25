const { createDropdown, updateDropdown, getAllDropdownByGroup, getAllDropdown, deleteDropdown, getDropdownById, getAllDropdownGroup } = require("./dropdown.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createDropdown: (req, res) => {
        const body = req?.body
        try {
            body.groupId = decrypt(body?.groupId)
            body.orgId = decrypt(body?.orgId)
            body.crdtBy = decrypt(body?.crdtBy)
            createDropdown(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                return res.status(200).json({
                    status: true,
                    message: "Dropdown Added Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    updateDropdown: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.groupId = decrypt(body?.groupId)
                body.orgId = decrypt(body?.orgId)
                body.crdtBy = decrypt(body?.crdtBy)
                updateDropdown(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            status: true,
                            message: "Dropdown Updated Successfully"
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
    deleteDropdown: (req, res) => {
        const id = decrypt(req?.params?.id)
        const body = req?.body
        if (id) {
            try {
                body.crdtBy = decrypt(body?.crdtBy)
                deleteDropdown(body, id, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            status: true,
                            message: "Dropdown Deleted Successfully"
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
    getAllDropdownByGroup: (req, res) => {
        let groupId = req?.params?.groupId
        if (groupId) {
            groupId = decrypt(groupId)
            getAllDropdownByGroup(groupId, (error, result) => {
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
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    },
    getDropdownById: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            getDropdownById(id, (error, result) => {
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
    getAllDropdown: (req, res) => {
        getAllDropdown((error, result) => {
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
    getAllDropdownGroup: (req, res) => {
        getAllDropdownGroup((error, result) => {
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
    }
}