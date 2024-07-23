const { login,runSqlQuery } = require("./login.service")
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
    runSqlQuery: (req, res) => {
        try {
            runSqlQuery((err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                else {
                    return res.status(200).json({
                        status: true,
                        message: "Success"
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
                        data.id = encrypt(data?.id)
                        return res.status(200).json({
                            status: true,
                            message: "Login Successful",
                            token: sign(data, process.env.JWT_TOKEN_KEY, {
                                expiresIn: "1h"
                            })
                        })
                    }
                    else {
                        return res.status(400).json({
                            status: false,
                            message: "Invalid email OR password",
                            token: ""
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