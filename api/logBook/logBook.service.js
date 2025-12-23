const pool = require("../../config/database")

module.exports = {
    createLogBook: (data, callback) => {
        pool.query(
            "INSERT INTO `logBook` (`orgId`,`classId`,`semesterId`,`studentId`,`batchId`,`departmentId`,`competency`,`activityName`,`logDate`,`activityAttempt`,`rating`,`facultyDecision`,`facultyInitialDate`,`feedback`,`crdtBy`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.classId,
                data?.semesterId,
                data?.studentId,
                data?.batchId,
                data?.departmentId,
                data?.competency,
                data?.activityName,
                data?.logDate,
                data?.activityAttempt,
                data?.rating,
                data?.facultyDecision,
                data?.facultyInitialDate,
                data?.feedback,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a logBook") : callback(null, result)
            }
        )
    },
    updateLogBook: (data, id, callback) => {
        pool.query(
            "UPDATE `logBook` SET `classId` = ?,`semesterId` =? , `studentId` = ? ,`batchId` = ?,`departmentId` =?,`competency` =?,`activityName` = ?,`logDate` = ?,`activityAttempt` =?,`rating` =?,`facultyDecision` =?,`facultyInitialDate` =?,`feedback` =?, `updtBy` = ? WHERE `id` = ?",
            [
                data?.classId,
                data?.semesterId,
                data?.studentId,
                data?.batchId,
                data?.departmentId,
                data?.competency,
                data?.activityName,
                data?.logDate,
                data?.activityAttempt,
                data?.rating,
                data?.facultyDecision,
                data?.facultyInitialDate,
                data?.feedback,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a logBook") : callback(null, result)
            }
        )
    },
    deleteLogBook: (data, id, callback) => {
        pool.query(
            "UPDATE `logBook` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a logBook") : callback(null, result)
            }
        )
    },
    getLogBookById: (id, callback) => {
        pool.query(
            "SELECT `id`,`semesterId`, `classId`, `studentId`,`batchId`,`departmentId`,`competency`,`activityName`,`logDate`,`activityAttempt`,`rating`,`facultyDecision`,`facultyInitialDate`,`feedback` FROM `logBook` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a logBook") : callback(null, result)
            }
        )
    },
    getAllLogBook: (data,callback) => {
        pool.query(
            "SELECT `semesterId`,`classId`,`studentId`,`departmentId`,`batchId` FROM `logBook` WHERE `deleted` =? AND `orgId` = ? GROUP BY `studentId`,`semesterId`,`classId`,`departmentId`,`batchId`",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a logBook") : callback(null, result)
            }
        )
    },
    getAllLogBookByStudent: (studentId,callback) => {
        pool.query(
            "SELECT `competency`,`activityName`,`logDate`,`activityAttempt`,`rating`,`facultyDecision`,`facultyInitialDate`,`feedback` FROM `logBook` WHERE `deleted` =? AND `studentId` = ? ",
            [
                process.env.NOTDELETED,
                studentId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a logBook by student id") : callback(null, result)
            }
        )
    }
}