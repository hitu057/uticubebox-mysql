const pool = require("../../config/database")

module.exports = {
    createDropdown: (data, callback) => {
        pool.query(
            "INSERT INTO `dropdown` (`name`,`groupId`) VALUES (?,?)",
            [
                data?.name,
                data?.groupId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a dropdown") : callback(null, result)
            }
        )
    },
    updateDropdown: (data, id, callback) => {
        pool.query(
            "UPDATE `dropdown` SET `name` = ?, `groupId` = ? WHERE `id` = ?",
            [
                data?.name,
                data?.groupId,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a dropdown") : callback(null, result)
            }
        )
    },
    deleteDropdown: (data, id, callback) => {
        pool.query(
            "UPDATE `dropdown` SET `deleted` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
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
            "SELECT `id` , `name`,`groupId` FROM `dropdown` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a dropdown") : callback(null, result)
            }
        )
    },
    getAllDropdown: (queryData, callback) => {
        pool.query(
            "SELECT `id` , `name`,`groupId` FROM `dropdown` WHERE `deleted` = ?",
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
            "SELECT  FROM `dropdownGroup`",
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while fetching a dropdown")
                else
                    return callback(null, result)
            }
        )
    }
}