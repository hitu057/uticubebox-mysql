const { login, organisation } = require("./login.service")
const { encrypt, decrypt } = require("../../enc_dec")
const sign = require("jwt-encode")
module.exports = {
    encryptData: (req, res) => {
        const id = encrypt(req?.params?.id)
        if (id) {
            return res.status(200).json({
                success: true,
                message: "Data encrypted successfully",
                result: id
            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Error while encrypting data"
            })
        }
    },
    decryptData: (req, res) => {
        const id = decrypt(req?.params?.id)
        if (id) {
            return res.status(200).json({
                success: true,
                message: "Data decrypted successfully",
                result: id
            })
        }
        else {
            return res.status(500).json({
                success: false,
                message: "Error while encrypting data"
            })
        }
    },
    organisation: (req, res) => {
        try {
            organisation((err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    result = result.map(item => ({ ...item, id: encrypt(item?.id),image: item?.image ? `${process.env.ORGANISATIONIMAGE}${item?.image}` : null }))
                    return res.status(200).json({
                        success: true,
                        message: "Organisation Data",
                        result : result
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
    login: (req, res) => {
        const body = req?.body
        try {
            body.orgId = decrypt(body?.orgId)
            body.password = encrypt(body?.password)
            login(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    if (result?.length) {
                        const data = result?.[0]
                        data.type = data?.fid > 0 ? 'Faculty' : 'Student'
                        delete data?.sid
                        delete data?.fid
                        data.id = encrypt(data?.id)
                        data.orgId = encrypt(data?.orgId)
                        data.semesterId = encrypt(data?.semesterId)
                        data.classId = encrypt(data?.classId)
                        data.batchId = encrypt(data?.batchId)
                        data.loginAt = new Date()
                        data.profile = data?.profile ? process.env.USERIMAGE + data?.profile : null
                        return res.status(200).json({
                            success: true,
                            message: "Login Successful",
                            token: sign(data, process.env.JWT_TOKEN_KEY, {
                                expiresIn: "1h"
                            })
                        })
                    }
                    else {
                        return res.status(400).json({
                            success: false,
                            message: "Invalid email OR password"
                        })
                    }
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