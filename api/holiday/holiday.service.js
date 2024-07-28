const pool = require("../../config/database")

module.exports = {
    createHoliday: (data, callback) => {
        pool.query(
            "INSERT INTO `holiday` (`orgId`,`title`,`description`,`holidayDate`,`crdtBy`) VALUES (?,?,?,?,?)",
            [
                data?.orgId,
                data?.title,
                data?.description,
                data?.holidayDate,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a holiday") : callback(null, result)
            }
        )
    },
    updateHoliday: (data, id, callback) => {
        pool.query(
            "UPDATE `holiday` SET `title` = ?, `description` = ? , `holidayDate` = ? , `updtBy` = ? WHERE `id` = ?",
            [
                data?.title,
                data?.description,
                data?.holidayDate,
                data?.updtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a holiday") : callback(null, result)
            }
        )
    },
    deleteHoliday: (data, id, callback) => {
        pool.query(
            "UPDATE `holiday` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.updtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a holiday") : callback(null, result)
            }
        )
    },
    getHolidayById: (id, callback) => {
        pool.query(
            "SELECT `id` , `title`, `description`, `holidayDate` FROM `holiday` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a holiday") : callback(null, result)
            }
        )
    },
    getAllHoliday: (callback) => {
        pool.query(
            "SELECT `id` , `title`, `description`, `holidayDate` FROM `holiday` WHERE `deleted` = ?",
            [
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a holiday") : callback(null, result)
            }
        )
    }
}