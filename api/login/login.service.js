const pool = require("../../config/database")

module.exports = {
    login: (data, callback) => {
        pool.query(
            "SELECT `id`,`firstname`,`lastname`,`email`,`contact` FROM `teams` WHERE `email` =? and `password` =? and `status` =? and `deleted` =? LIMIT 1",
            [
                data?.email,
                data?.password,
                process.env.ACTIVE,
                process.env.NOTDELETED,
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while login")
                else
                    return callback(null, result)
            }
        )
    }
}