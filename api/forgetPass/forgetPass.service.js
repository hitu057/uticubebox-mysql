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
                console.log(result)
                if (error)
                    return callback(error?.sqlMessage || "Error while finding a user")
                if (result?.length === 0)
                    return callback("User not found")
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                pool.query(
                    "UPDATE `user` SET `otp` = ? WHERE email = ?",
                    [
                        otp,
                        data?.emailId
                    ],
                    (err, res) => {
                        if (error)
                            return callback(err?.sqlMessage || "Error while sending otp")
                        return callback(null, otp)
                    })
            }
        )
    }
}