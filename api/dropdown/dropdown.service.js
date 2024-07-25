const pool = require("../../config/database")

module.exports = {
    createDropdown: (data, callback) => {
        pool.query(
            "INSERT INTO `dropdown` (`orgId`,`name`,`groupId`,`crdtBy`) VALUES (?,?,?,?)",
            [
                data?.orgId,
                data?.name,
                data?.groupId,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a dropdown") : callback(null, result)
            }
        )
    },
    updateDropdown: (data, id, callback) => {
        pool.query(
            "UPDATE `dropdown` SET `name` = ?, `groupId` = ? , `updtBy` = ? WHERE `id` = ?",
            [
                data?.name,
                data?.groupId,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a dropdown") : callback(null, result)
            }
        )
    },
    deleteDropdown: (data, id, callback) => {
        pool.query(
            "UPDATE `dropdown` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a dropdown") : callback(null, result)
            }
        )
    },
    getAllDropdownByGroup: (groupId, callback) => {
        pool.query(
            "SELECT `id` , `name` FROM `dropdown` WHERE `deleted` = ? AND `groupId` = ? ",
            [
                process.env.NOTDELETED,
                groupId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a dropdown") : callback(null, result)
            }
        )
    },
    getDropdownById: (id, callback) => {
        pool.query(
            "SELECT `id` , `name` FROM `dropdown` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a dropdown") : callback(null, result)
            }
        )
    },
    getAllDropdown: (callback) => {
        pool.query(
            "SELECT d.`id` , d.`name`,dg.`name` AS groupName FROM `dropdown` d LEFT JOIN `dropdownGroup` dg ON dg.`id` = d.`groupId` WHERE d.`deleted` = ?",
            [
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a dropdown") : callback(null, result)
            }
        )
    },
    getAllDropdownGroup: (callback) => {
        pool.query(
            "SELECT `id`,`name` FROM `dropdownGroup` WHERE `deleted` = ?",
            [
                process.env.NOTDELETED
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while fetching a dropdown")
                else
                    return callback(null, result)
            }
        )
    }
}