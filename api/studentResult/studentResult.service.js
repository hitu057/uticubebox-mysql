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
    },
    studentList: (data, callback) => {
        pool.query(
            "SELECT u.`id`, u.`firstname`,u.`middelname`,u.`lastname`,s.`rollNumber` FROM `user` u LEFT JOIN `student` AS s ON s.`userId` = u.`id` LEFT JOIN `batch` b ON b.`userId` = u.`id` WHERE u.`orgId` = ? AND b.`classId` = ? AND b.`semesterId` = ? AND b.`batchId` = ? AND u.`deleted` = ?",
            [
                data?.orgId,
                data?.classId,
                data?.semesterId,
                data?.batchId,
                process.env.NOTDELETED,
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || 'Error while fetching student') : callback(null, result)
            }
        )
    }
}