const pool = require("../../config/database")

module.exports = {
    organisation: (callback) => {
        pool.query(
            "SELECT `id`,`name`,`image` FROM `organisation` WHERE `deleted` = ?",
            [
                process.env.NOTDELETED
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while getting organisation")
                else
                    return callback(null, result)
            }
        )
    },
    login: (data, callback) => {
        pool.query(
            "SELECT u.`id`,u.`orgId`,u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`profile`,f.`id` AS fid , s.`id` AS sid,d.`name` AS role,b.`batchId`,b.`classId`,b.`semesterId` FROM `user` u LEFT JOIN `faculty` f ON f.`userId` = u.`id` LEFT JOIN `student` s ON s.`userId` = f.`id` LEFT JOIN `dropdown` d ON d.`id` = f.`roleId` LEFT JOIN `batch` b ON b.`userId` = u.`id` WHERE u.`email` =? AND u.`password` =? AND u.`orgId` = ? AND u.`deleted` =?  LIMIT 1",
            [
                data?.email,
                data?.password,
                data?.orgId,
                process.env.NOTDELETED
            ],
            (error, result) => {
                if (error){
                    console.log('error',error)
                    return callback(error?.sqlMessage || "Error while login")
                }
                else {
                    if (result.length) {
                        pool.query(
                            "INSERT INTO `loginTransaction` (`userId`,`deviceId`) VALUES (?,?)",
                            [
                                result?.[0]?.id,
                                data?.deviceId
                            ],
                            (err, res) => {
                                if (err)
                                    return callback(err?.sqlMessage || "Error while login")
                                else
                                    return callback(null, result)
                            })
                    }
                    else
                        return callback(error?.sqlMessage || "Error while login")
                }
            }
        )
    }
}