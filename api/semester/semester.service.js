const pool = require("../../config/database")

module.exports = {
    createSemester: (data, callback) => {
        pool.query(
            "INSERT INTO `semester` (`orgId`,`name`,`classId`,`crdtBy`) VALUES (?,?,?,?)",
            [
                data?.orgId,
                data?.name,
                data?.classId,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a semester") : callback(null, result)
            }
        )
    },
    updateSemester: (data, id, callback) => {
        pool.query(
            "UPDATE `semester` SET `name` = ?, `classId` = ? , `updtBy` = ? WHERE `id` = ?",
            [
                data?.name,
                data?.classId,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a semester") : callback(null, result)
            }
        )
    },
    deleteSemester: (data, id, callback) => {
        pool.query(
            "UPDATE `semester` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a semester") : callback(null, result)
            }
        )
    },
    getSemesterById: (id, callback) => {
        pool.query(
            "SELECT `id` , `name`, `classId` FROM `semester` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a semester") : callback(null, result)
            }
        )
    },
    getAllSemester: (data, callback) => {
        pool.query(
            "SELECT `id` ,`name`,`classId` FROM `semester` WHERE `deleted` = ? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a semester") : callback(null, result)
            }
        )
    },
    getAllSemesterByClass: (data, callback) => {
        pool.query(
            "SELECT `id` ,`name` FROM `semester` WHERE `deleted` = ? AND `orgId` = ? AND `classId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId,
                data?.classId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a semester") : callback(null, result)
            }
        )
    }
}