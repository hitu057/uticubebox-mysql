const pool = require("../../config/database")

module.exports = {
    createDepartment: (data, callback) => {
        pool.query(
            "INSERT INTO `department` (`orgId`,`batchId`,`classId`,`semesterId`,`departmentId`,`crdtBy`) VALUES (?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.batchId,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a department") : callback(null, result)
            }
        )
    },
    updateDepartment: (data, id, callback) => {
        pool.query(
            "UPDATE `department` SET `batchId` = ?, `semesterId` = ?,`classId` = ? , `departmentId` = ? , `updtBy` = ? WHERE `id` = ?",
            [
                data?.batchId,
                data?.semesterId,
                data?.classId,
                data?.departmentId,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a department") : callback(null, result)
            }
        )
    },
    deleteDepartment: (data, id, callback) => {
        pool.query(
            "UPDATE `department` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a department") : callback(null, result)
            }
        )
    },
    getDepartmentById: (id, callback) => {
        pool.query(
            "SELECT `id` , `batchId`, `semesterId`,`classId`, `departmentId` FROM `department` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a department") : callback(null, result)
            }
        )
    },
    getAllDepartment: (data,callback) => {
        pool.query(
            "SELECT `id` , `batchId`, `semesterId`,`classId`, `departmentId` FROM `department` WHERE `deleted` = ? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a department") : callback(null, result)
            }
        )
    }
}