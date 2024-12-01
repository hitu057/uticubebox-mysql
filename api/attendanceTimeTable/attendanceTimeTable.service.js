const pool = require("../../config/database")

module.exports = {
    createAttendanceTimeTable: (data, callback) => {
        pool.query(
            "INSERT INTO `attendanceTimeTable` (`orgId`,`userId`,`classId`,`semesterId`,`departmentId`,`batchId`,`lectureDate`,`startTime`,`endTime`,`crdtBy`) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.userId,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.batchId,
                data?.lectureDate,
                data?.startTime,
                data?.endTime,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a attendance time table") : callback(null, result)
            }
        )
    },
    updateAttendanceTimeTable: (data, id, callback) => {
        pool.query(
            "UPDATE `attendanceTimeTable` SET `userId` = ?, `classId` = ?,`semesterId` =?,`batchId` =? , `departmentId` = ? ,`lectureDate` = ?,`startTime` =?,`endTime` =?, `updtBy` = ? WHERE `id` = ?",
            [
                data?.userId,
                data?.classId,
                data?.semesterId,
                data?.batchId,
                data?.departmentId,
                data?.lectureDate,
                data?.startTime,
                data?.endTime,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a attendance time table") : callback(null, result)
            }
        )
    },
    deleteAttendanceTimeTable: (data, id, callback) => {
        pool.query(
            "UPDATE `attendanceTimeTable` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a attendanceTimeTable") : callback(null, result)
            }
        )
    },
    getAttendanceTimeTableById: (id, callback) => {
        pool.query(
            "SELECT `id`, `userId`,`semesterId`, `classId`, `departmentId`,`batchId`,`lectureDate`,`startTime`,`endTime` FROM `attendanceTimeTable` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a attendance time table") : callback(null, result)
            }
        )
    },
    getAllAttendanceTimeTable: (data,callback) => {
        pool.query(
            "SELECT a.`id` ,u.`firstname`,u.`lastname`, d.`name` AS department,`lectureDate`,`startTime`,`endTime`,`classId`,`semesterId`,`departmentId` FROM `attendanceTimeTable` AS a LEFT JOIN `user` AS u ON u.`id` = a.`userId` LEFT JOIN `dropdown` AS d ON d.`id` = a.`departmentId` WHERE a.`deleted` = ? AND a.`orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a attendance time table") : callback(null, result)
            }
        )
    }
}