const pool = require("../../config/database")

module.exports = {
    sendOtp: (data, callback) => {
        pool.query(
            "SELECT `id` FROM `user` WHERE `email` = ? AND `deleted` = ? LIMIT 1",
            [
                data?.emailId,
                process.env.NOTDELETED
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while finding a user")
                if (result?.length === 0)
                    return callback("User not found")
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                pool.query(
                    "UPDATE `user` SET `otp` = ?, `isOtpExpire` = ? WHERE email = ?",
                    [
                        otp,
                        process.env.NOTDELETED,
                        data?.emailId
                    ],
                    (err, res) => {
                        if (error)
                            return callback(err?.sqlMessage || "Error while sending otp")
                        return callback(null, otp)
                    }
                )
            }
        )
    },
    sendOtpToEmail: (data, callback) => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        pool.query(
            "INSERT INTO `studentVerification` (`otp`,`email`) VALUES (?,?)",
            [
                otp,
                data?.emailId
            ],
            (err, res) => {
                if (err)
                    return callback(err?.sqlMessage || "Error while sending otp")
                return callback(null, res)
            }
        )
    },
    verifyOtp: (data, callback) => {
        pool.query(
            "SELECT `otp` FROM `user` WHERE `email` = ? AND `deleted` = ? AND `isOtpExpire` = ?",
            [
                data?.emailId,
                process.env.NOTDELETED,
                process.env.NOTDELETED
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while finding a OTP")
                if (result?.length === 0)
                    return callback("OTP is expired")
                if (result?.[0]?.otp != data?.otp)
                    return callback("OTP didn't match")
                pool.query(
                    "UPDATE `user` SET `isOtpExpire` = ? WHERE email = ?",
                    [
                        process.env.DELETED,
                        data?.emailId
                    ],
                    (err, res) => {
                        if (error)
                            return callback(err?.sqlMessage || "Error while validating an OTP")
                        return callback(null, res)
                    }
                )
            }
        )
    },
    verifyOtpToEmail: (data, callback) => {
        pool.query(
            "SELECT `otp` FROM `studentVerification` WHERE `email` = ?",
            [
                data?.emailId
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while finding a OTP")
                if (result?.[0]?.otp != data?.otp)
                    return callback("OTP didn't match")
                return callback(null, result)
            }
        )
    },
    changePass: (data, callback) => {
        pool.query(
            "UPDATE `user` SET `password` = ? WHERE `email` = ?",
            [
                data?.password,
                data?.emailId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while changing a password") : callback(null, result)
            }
        )
    }
}