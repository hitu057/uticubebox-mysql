const pool = require("../../config/database")

module.exports = {
    organisation: (callback) => {
        pool.query(
            "SELECT `id`,`name` FROM `organisation` WHERE `deleted` = ?",
            [
                process.env.NOTDELETED
            ],
            (error, result) => {
                console.log(error)
                if (error)
                    return callback(error?.sqlMessage || "Error while getting organisation")
                else
                    return callback(null, result)
            }
        )
    },
    login: (data, callback) => {
        pool.query(
            "SELECT u.`id`,u.`orgId`,u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`profile`,f.`id` AS fid , s.`id` AS sid,d.`name` AS role FROM `user` u LEFT JOIN `faculty` f ON f.`userId` = u.`id` LEFT JOIN `student` s ON s.`userId` = f.`id` LEFT JOIN `dropdown` d ON d.`id` = f.`roleId` WHERE u.`email` =? AND u.`password` =? AND u.`orgId` = ? AND u.`deleted` =?  LIMIT 1",
            [
                data?.email,
                data?.password,
                data?.orgId,
                process.env.NOTDELETED
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