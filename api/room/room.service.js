const pool = require("../../config/database")

module.exports = {
    createRoom: (data, callback) => {
        pool.query(
            "INSERT INTO `room` (`orgId`,`hostel`,`sharing`,`roomNumber`,`preference`,`crdtBy`) VALUES (?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.hostel,
                data?.sharing,
                data?.roomNumber,
                data?.preference,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a room") : callback(null, result)
            }
        )
    },
    updateRoom: (data, id, callback) => {
        pool.query(
            "UPDATE `room` SET `hostel` = ?, `sharing` = ?,`roomNumber` = ? , `preference` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                data?.hostel,
                data?.sharing,
                data?.roomNumber,
                data?.preference,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a room") : callback(null, result)
            }
        )
    },
    deleteRoom: (data, id, callback) => {
        pool.query(
            "UPDATE `room` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a room") : callback(null, result)
            }
        )
    },
    getRoomById: (id, callback) => {
        pool.query(
            "SELECT `id` , `hostel`, `sharing`,`roomNumber`, `preference` FROM `room` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a room") : callback(null, result)
            }
        )
    },
    getAllRoom: (data,callback) => {
        pool.query(
            "SELECT `id` , `hostel`, `sharing`,`roomNumber`, `preference` FROM `room` WHERE `deleted` = ? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a room") : callback(null, result)
            }
        )
    }
}