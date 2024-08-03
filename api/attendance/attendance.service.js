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
}