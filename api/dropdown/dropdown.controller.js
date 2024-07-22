const { createDropdown, updateDropdown, getAllDropdownByGroup, getAllDropdown, deleteDropdown, getDropdownById, getAllDropdownGroup } = require("./dropdown.service")
const { encrypt, decrypt } = require("../../enc_dec")
module.exports = {
    createDropdown: (req, res) => {
        const body = req?.body
        try {
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
        body.updt_by = decrypt(body?.updt_by)
        body.status = decrypt(body?.status)
        if (id && body?.updt_by && body?.status) {
            try {
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
        body.updt_by = decrypt(body?.updt_by)
        if (id && body?.updt_by) {
            try {
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
        const group_name = req?.params?.group_name
        if (group_name) {
            getAllDropdownByGroup(group_name, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error
                    })
                }
                else {
                    result.map(item => {
                        item.id = encrypt(item?.id)
                    })
                    return res.status(200).json({
                        status: true,
                        message: result?.length > 0 ? "Data Found" : "No Data Found",
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
                    result.map(item => {
                        item.id = encrypt(item?.id)
                        item.status = encrypt(item?.status)
                    })
                    return res.status(200).json({
                        status: true,
                        message: result?.length > 0 ? "Data Found" : "No Data Found",
                        result: result?.length > 0 ? result[0] : result
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
        const queryData = req?.query
        getAllDropdown(queryData, (error, result) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error
                })
            }
            else {
                result?.data?.map(item => {
                    item.id = encrypt(item?.id)
                    item.group_name = item.group_name = (item?.group_name || '').replaceAll('_', ' ').replace(/\b\w/g, x => x.toUpperCase());
                })
                return res.status(200).json({
                    status: true,
                    message: result?.data?.length > 0 ? "Data Found" : "No Data Found",
                    result: result?.data,
                    total: result?.total
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
                result.map(item => {
                    item.id = item?.group_name
                    item.group_name = item.group_name = (item?.group_name || '').replaceAll('_', ' ').replace(/\b\w/g, x => x.toUpperCase());
                })
                return res.status(200).json({
                    status: true,
                    message: result?.length > 0 ? "Data Found" : "No Data Found",
                    result: result
                })
            }
        })
    }
}