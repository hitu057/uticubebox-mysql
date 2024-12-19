const pool = require("../../config/database")

module.exports = {
    createHostel: (data, callback) => {
        pool.query(
            "INSERT INTO `hostel` (`orgId`,`title`,`description`,`roomNumber`,`floorNumber`,`crdtBy`) VALUES (?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.title,
                data?.description,
                data?.roomNumber,
                data?.floorNumber,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a hostel") : callback(null, result)
            }
        )
    },
    updateHostel: (data, id, callback) => {
        pool.query(
            "UPDATE `hostel` SET `title` = ?, `description` = ?,`roomNumber` = ? , `floorNumber` = ? , `updtBy` = ? WHERE `id` = ?",
            [
                data?.title,
                data?.description,
                data?.roomNumber,
                data?.floorNumber,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a hostel") : callback(null, result)
            }
        )
    },
    deleteHostel: (data, id, callback) => {
        pool.query(
            "UPDATE `hostel` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a hostel") : callback(null, result)
            }
        )
    },
    getHostelById: (id, callback) => {
        pool.query(
            "SELECT `id` , `title`, `description`,`roomNumber`, `floorNumber` FROM `hostel` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a hostel") : callback(null, result)
            }
        )
    },
    getAllHostel: (data,callback) => {
        pool.query(
            "SELECT `id` , `title`, `description`,`roomNumber`, `floorNumber` FROM `hostel` WHERE `deleted` = ? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a hostel") : callback(null, result)
            }
        )
    }
}