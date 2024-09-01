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
    getAllDropdownByGroup: (data,groupId, callback) => {
        pool.query(
            "SELECT `id` , `name` FROM `dropdown` WHERE `deleted` = ? AND `groupId` = ? AND `orgId` = ? ",
            [
                process.env.NOTDELETED,
                groupId,
                data?.orgId
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
    getAllDropdown: (data,callback) => {
        pool.query(
            "SELECT d.`id` , d.`name`,dg.`name` AS groupName FROM `dropdown` d LEFT JOIN `dropdownGroup` dg ON dg.`id` = d.`groupId` WHERE d.`deleted` = ? AND d.`orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a dropdown") : callback(null, result)
            }
        )
    },
    getAllDropdownGroup: (data,callback) => {
        pool.query(
            "SELECT `id`,`name` FROM `dropdownGroup` WHERE `deleted` = ? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while fetching a dropdown")
                else
                    return callback(null, result)
            }
        )
    },
    getStudentlist: (data,callback) => {
        pool.query(
            "SELECT u.`id`,u.`firstname`,u.`middelname`,u.`lastname` FROM `batch` AS b LEFT JOIN `user` AS u ON u.`id` = b.`userId` WHERE b.`deleted` = ? AND u.`orgId` = ? AND b.`classId` = ? AND b.`semesterId` = ? AND b.`batchId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId,
                data?.classId,
                data?.semesterId,
                data?.batchId
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while fetching a student")
                else
                    return callback(null, result)
            }
        )
    },
}