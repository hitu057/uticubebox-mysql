const pool = require("../../config/database")

module.exports = {
    createExamTimeTable: (data, callback) => {
        pool.query(
            "INSERT INTO `examTimeTable` (`orgId`,`userId`,`classId`,`semesterId`,`departmentId`,`examDate`,`startTime`,`endTime`,`crdtBy`) VALUES (?,?,?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.userId,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.examDate,
                data?.startTime,
                data?.endTime,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a exam time table") : callback(null, result)
            }
        )
    },
    updateExamTimeTable: (data, id, callback) => {
        pool.query(
            "UPDATE `examTimeTable` SET `userId` = ?, `classId` = ?,`semesterId` =? , `departmentId` = ?,`examDate` = ?,`startTime` =?,`endTime` =?, `updtBy` = ? WHERE `id` = ?",
            [
                data?.userId,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.examDate,
                data?.startTime,
                data?.endTime,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a exam time table") : callback(null, result)
            }
        )
    },
    deleteExamTimeTable: (data, id, callback) => {
        pool.query(
            "UPDATE `examTimeTable` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a examTimeTable") : callback(null, result)
            }
        )
    },
    getExamTimeTableById: (id, callback) => {
        pool.query(
            "SELECT `id`, `userId`,`semesterId`, `classId`, `departmentId`,`examDate`,`startTime`,`endTime` FROM `examTimeTable` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a exam time table") : callback(null, result)
            }
        )
    },
    getAllExamTimeTable: (data,callback) => {
        pool.query(
            "SELECT a.`id` ,u.`firstname`,u.`lastname`, d.`name` AS department,`examDate`,`startTime`,`endTime` FROM `examTimeTable` AS a LEFT JOIN `user` AS u ON u.`id` = a.`userId` LEFT JOIN `dropdown` AS d ON d.`id` = a.`departmentId` WHERE a.`deleted` = ? AND a.`orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a exam time table") : callback(null, result)
            }
        )
    }
}