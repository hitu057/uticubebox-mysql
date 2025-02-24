const pool = require("../../config/database")

module.exports = {
    createCourse: (data, callback) => {
        pool.query(
            "INSERT INTO `course` (`orgId`,`title`,`description`,`classId`,`semesterId`,`departmentId`,`crdtBy`) VALUES (?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.title,
                data?.description,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a course") : callback(null, result)
            }
        )
    },
    updateCourse: (data, id, callback) => {
        pool.query(
            "UPDATE `course` SET `title` = ?, `description` = ? , `classId` = ? ,`semesterId` = ?,`departmentId` = ?, `updtBy` = ? WHERE `id` = ?",
            [
                data?.title,
                data?.description,
                data?.classId,
                data?.semesterId,
                data?.departmentId,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a course") : callback(null, result)
            }
        )
    },
    deleteCourse: (data, id, callback) => {
        pool.query(
            "UPDATE `course` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a course") : callback(null, result)
            }
        )
    },
    getCourseById: (id, callback) => {
        pool.query(
            "SELECT `id` , `title`, `description`, `classId`,`semesterId`,`departmentId` FROM `course` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a course") : callback(null, result)
            }
        )
    },
    getAllCourse: (data,callback) => {
        pool.query(
            "SELECT `id` , `title`, `description`, `classId`,`semesterId`,`departmentId` FROM `course` WHERE `deleted` = ? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a course") : callback(null, result)
            }
        )
    }
}