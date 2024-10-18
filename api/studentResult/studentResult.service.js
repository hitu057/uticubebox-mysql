const pool = require("../../config/database")

module.exports = {
    resultList: (data, callback) => {
        pool.query(
            "SELECT u.`id`, u.`firstname`,u.`middelname`,u.`lastname`,s.`rollNumber`,sr.`total`,sr.`marksGot`,sr.`passing`,sr.`departmentId` FROM `studentResult` sr LEFT JOIN `user` u ON u.`id` = sr.`studentId` LEFT JOIN `student` AS s ON s.`userId` = u.`id` WHERE sr.`orgId` = ? AND sr.`classId` = ? AND sr.`semesterId` = ? AND sr.`deleted` = ? AND sr.`studentId` = ?",
            [
                data?.orgId,
                data?.classId,
                data?.semesterId,
                process.env.NOTDELETED,
                data?.studentId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || 'Error while fetching student') : callback(null, result)
            }
        )
    }
}