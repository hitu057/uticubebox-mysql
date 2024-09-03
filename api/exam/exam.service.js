const pool = require("../../config/database")

module.exports = {
    studentList: (data, callback) => {
        pool.query(
            "SELECT u.`id`, u.`firstname`,u.`middelname`,u.`lastname`, COUNT(a.`id`) AS totalClasses, SUM(CASE WHEN a.`isPresent` = 1 THEN 1 ELSE 0 END) AS presentCount,s.`rollNumber`, SUM(f.`amount`) AS totalAmount, SUM(p.`amount`) AS paidAmount,h.`id` AS hallTicket FROM `attendanceTimeTable` at LEFT JOIN `attendance` a ON at.`id` = a.`timeTableId` LEFT JOIN `user` u ON u.`id` = at.`userId` LEFT JOIN `student` AS s ON s.`userId` = u.`id` LEFT JOIN `fee` AS f ON f.`classId` = ? AND f.`semesterId` = ? AND f.`deleted` = ? LEFT JOIN `payment` AS p ON p.`crdtby` = u.`id` AND p.`paymentStatus` = ? LEFT JOIN `hallTicket` AS h ON h.`classId` = ? AND h.`userId` = u.`id` AND h.`semesterId` =? WHERE at.`orgId` = ? AND at.`classId` = ? AND at.`semesterId` = ? AND at.`deleted` = ? GROUP BY at.`id` , s.`rollNumber`,h.`id`",
            [
                data?.classId,
                data?.semesterId,
                process.env.NOTDELETED,
                process.env.ACTIVE,
                data?.classId,
                data?.semesterId,
                data?.orgId,
                data?.classId,
                data?.semesterId,
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || 'Error while fetching student') : callback(null, result)
            }
        )
    },
    studentListForAttendance: (data, callback) => {
        pool.query(
            "SELECT u.`id`,u.`firstname`,u.`middelname`,u.`lastname`,u.`profile`,s.`rollNumber` FROM `hallTicket` AS h LEFT JOIN `user` AS u ON u.`id` = h.`userId` LEFT JOIN `student` AS s ON s.`userId` = u.`id` WHERE h.`orgId` = ? AND h.`classId` = ? AND h.`semesterId` = ? AND h.`deleted` = ?",
            [
                data?.orgId,
                data?.classId,
                data?.semesterId,
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching student list") : callback(null, result)
            }
        )
    },
    generateHallTicket: (data, callback) => {
        pool.query(
            "INSERT INTO `hallTicket` (`orgId`,`userId`,`classId`,`semesterId`,`venue`,`crdtBy`) VALUES (?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.studentId,
                data?.classId,
                data?.semesterId,
                data?.venue,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while generating hallticket") : callback(null, result)
            }
        )
    },
    examAttendance: (orgId, timeTableId, data, callback) => {
        pool.query(
            "SELECT `id` FROM `examAttendance` WHERE `orgId` = ? AND `timeTableId` = ? AND `userId` = ? AND `deleted` =?",
            [
                orgId,
                timeTableId,
                data?.userId,
                process.env.NOTDELETED
            ],
            (error, result) => {
                if (error) {
                    return callback(error?.sqlMessage || "Error while marking a attendance")
                } else {
                    if (result?.length && result?.[0]?.id) {
                        const id = result?.[0]?.id
                        pool.query(
                            "UPDATE `examAttendance` SET `isPresent` = ? WHERE `id` = ?",
                            [
                                data?.isPresent,
                                id
                            ],
                            (error, response) => {
                                return error ? callback(error?.sqlMessage || "Error while marking a attendance") : callback(null, response)
                            }
                        )
                    }
                    else {
                        pool.query(
                            "INSERT INTO `examAttendance` (`userId`,`isPresent`,`timeTableId`,`orgId`) VALUES (?,?,?,?)",
                            [
                                data?.userId,
                                data?.isPresent,
                                timeTableId,
                                orgId
                            ],
                            (error, response) => {
                                return error ? callback(error?.sqlMessage || "Error while marking a attendance") : callback(null, response)
                            }
                        )
                    }
                }
            }
        )
    },
}