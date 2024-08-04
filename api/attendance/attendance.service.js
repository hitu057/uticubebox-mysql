const pool = require("../../config/database")

module.exports = {
    verifyFaculty: (data, callback) => {
        pool.query(
            "SELECT `id` FROM `attendanceTimeTable` WHERE `orgId` = ? AND `userId` = ? AND `classId` = ?  AND `semesterId` = ?  AND `departmentId` = ?  AND `lectureDate` = ? AND `startTime` = ? AND `endTime` = ? AND `deleted` =?",
            [
                data?.orgId,
                data?.userId,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.lectureDate,
                data?.startTime,
                data?.endTime,
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || 'Error while verifying faculty') : callback(null, result)
            }
        )
    },
    startAttendance: (data, callback) => {
        pool.query(
            "SELECT `id`,`isStarted` FROM `attendanceTimeTable` WHERE `orgId` = ? AND `userId` = ? AND `classId` = ?  AND `semesterId` = ?  AND `departmentId` = ?  AND `lectureDate` = ? AND `startTime` = ? AND `endTime` = ? AND`deleted` =?",
            [
                data?.orgId,
                data?.userId,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.lectureDate,
                data?.startTime,
                data?.endTime,
                process.env.NOTDELETED
            ],
            (error, result) => {
                if (error) {
                    return callback(error?.sqlMessage || "Error while starting a attendance")
                } else {
                    if (result?.length && result?.[0]?.id) {
                        const res = result?.[0]
                        if (res?.isStarted){
                            res.uniqueId = res?.id
                            return callback(null, result)
                        }
                        pool.query(
                            "UPDATE `attendanceTimeTable` SET `isStarted` = ? , `glat` = ? , `glong` = ? , `updtBy` = ? WHERE `id` = ?",
                            [
                                process.env.ACTIVE,
                                data?.glat,
                                data?.glong,
                                data?.crdtBy,
                                res?.id
                            ],
                            (error, response) => {
                                response.uniqueId = res?.id
                                return error ? callback(error?.sqlMessage || "Error while starting a attendance") : callback(null, response)
                            }
                        )
                    }
                    else {
                        return callback("No timetable found")
                    }
                }
            }
        )
    },
    stopAttendance: (data, callback) => {
        pool.query(
            "SELECT `id`,`isStarted` FROM `attendanceTimeTable` WHERE `orgId` = ? AND `userId` = ? AND `classId` = ?  AND `semesterId` = ?  AND `departmentId` = ?  AND `lectureDate` = ? AND `startTime` = ? AND `endTime` = ? AND`deleted` =?",
            [
                data?.orgId,
                data?.userId,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.lectureDate,
                data?.startTime,
                data?.endTime,
                process.env.NOTDELETED
            ],
            (error, result) => {
                if (error) {
                    return callback(error?.sqlMessage || "Error while stopping a attendance")
                } else {
                    if (result?.length && result?.[0]?.id) {
                        const res = result?.[0]
                        if (!res?.isStarted){
                            res.uniqueId = res?.id
                            return callback(null, res)
                        }
                        pool.query(
                            "UPDATE `attendanceTimeTable` SET `isStarted` = ? , `updtBy` = ? WHERE `id` = ?",
                            [
                                process.env.INACTIVE,
                                data?.crdtBy,
                                res?.id
                            ],
                            (error, response) => {
                                response.uniqueId = res?.id
                                return error ? callback(error?.sqlMessage || "Error while stopping a attendance") : callback(null, response)
                            }
                        )
                    }
                    else 
                        return callback("No timetable found")
                }
            }
        )
    },
    markAttendance: (orgId,timeTableId,data, callback) => {
        pool.query(
            "SELECT `id` FROM `attendance` WHERE `orgId` = ? AND `timeTableId` = ? AND `userId` = ? AND `deleted` =?",
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
                            "UPDATE `attendance` SET `isPresent` = ?,`remark` = ? WHERE `id` = ?",
                            [
                                data?.isPresent,
                                data?.remark,
                                id
                            ],
                            (error, response) => {
                                return error ? callback(error?.sqlMessage || "Error while marking a attendance") : callback(null, response)
                            }
                        )
                    }
                    else {
                        pool.query(
                            "INSERT INTO `attendance` (`userId`,`isPresent`,`remark`,`timeTableId`,`orgId`) VALUES (?,?,?,?,?)",
                            [
                                data?.userId,
                                data?.isPresent,
                                data?.remark,
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
    studentList: (data, callback) => {
        pool.query(
            "SELECT u.`id`,u.`firstname`,u.`middelname`,u.`lastname`,u.`profile`,s.`rollNumber`,a.`isPresent`,a.`remark` FROM `user` AS u RIGHT JOIN `student` AS s ON s.`userId` = u.`id` LEFT JOIN `batch` AS b ON b.`userId` = u.`id` LEFT JOIN `attendance` AS a ON a.`userId` = u.`id` AND a.`timeTableId` = ? WHERE u.`orgId` = ? AND u.`deleted` =? AND b.`classId` = ? AND b.`semesterId` = ? AND b.`deleted` = ?",
            [
                data?.timeTableId,
                data?.orgId,
                process.env.NOTDELETED,
                data?.classId,
                data?.semesterId,
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching student list") : callback(null, result)
            }
        )
    },
}