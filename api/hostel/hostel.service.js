const pool = require("../../config/database")

module.exports = {
    createHostel: (data, callback) => {
        pool.query(
            "INSERT INTO `hostel` (`orgId`,`name`,`warden`,`address`,`pincode`,`city`,`state`,`crdtBy`) VALUES (?,?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.name,
                data?.warden,
                data?.address,
                data?.pincode,
                data?.city,
                data?.state,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a hostel") : callback(null, result)
            }
        )
    },
    updateHostel: (data, id, callback) => {
        pool.query(
            "UPDATE `hostel` SET `name` = ?, `warden` = ?,`address` = ? , `pincode` = ?,`city`= ?,`state` = ? , `updtBy` = ? WHERE `id` = ?",
            [
                data?.name,
                data?.warden,
                data?.address,
                data?.pincode,
                data?.city,
                data?.state,
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
            "SELECT `id` , `name`, `warden`,`address`, `pincode`,`city`,`state` FROM `hostel` WHERE `deleted` = ? and `id` = ?",
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
            "SELECT `id` , `name`, `warden`,`address`, `pincode`,`city`,`state` FROM `hostel` WHERE `deleted` = ? AND `orgId` = ?",
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