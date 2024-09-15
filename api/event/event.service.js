const pool = require("../../config/database")

module.exports = {
    createEvent: (data, callback) => {
        pool.query(
            "INSERT INTO `event` (`orgId`,`title`,`description`,`startDate`,`showDashboard`,`endDate`,`crdtBy`) VALUES (?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.title,
                data?.description,
                data?.startDate,
                data?.showDashboard,
                data?.endDate,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a event") : callback(null, result)
            }
        )
    },
    updateEvent: (data, id, callback) => {
        pool.query(
            "UPDATE `event` SET `title` = ?, `description` = ? , `startDate` = ? ,`endDate` = ?,`showDashboard` = ?, `updtBy` = ? WHERE `id` = ?",
            [
                data?.title,
                data?.description,
                data?.startDate,
                data?.endDate,
                data?.showDashboard,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a event") : callback(null, result)
            }
        )
    },
    deleteEvent: (data, id, callback) => {
        pool.query(
            "UPDATE `event` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a event") : callback(null, result)
            }
        )
    },
    getEventById: (id, callback) => {
        pool.query(
            "SELECT `id` , `title`, `description`, `startDate`,`endDate`,`showDashboard` FROM `event` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a event") : callback(null, result)
            }
        )
    },
    getAllEvent: (data,callback) => {
        pool.query(
            "SELECT `id` , `title`, `description`, `startDate`,`endDate`,`showDashboard` FROM `event` WHERE `deleted` = ? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a event") : callback(null, result)
            }
        )
    }
}