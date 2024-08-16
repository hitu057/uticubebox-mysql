const pool = require("../../config/database")

module.exports = {
    createFee: (data, callback) => {
        pool.query(
            "INSERT INTO `fee` (`orgId`,`classId`,`semesterId`,`startDate`,`endDate`,`amount`,`title`,`description`,`crdtBy`) VALUES (?,?,?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.classId,
                data?.semesterId,
                data?.startDate,
                data?.endDate,
                data?.amount,
                data?.title,
                data?.description,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a fee") : callback(null, result)
            }
        )
    },
    addOnlinePayment: (data, callback) => {
        pool.query(
            "INSERT INTO `payment` (`orgId`,`feeId`,`amount`,`transactionId`,`crdtBy`) VALUES (?,?,?,?,?)",
            [
                data?.orgId,
                data?.feeId,
                data?.amount,
                data?.transactionId,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a fee") : callback(null, result)
            }
        )
    },
    updateFee: (data, id, callback) => {
        pool.query(
            "UPDATE `fee` SET `classId` = ?,`semesterId` =? , `startDate` = ? ,`endDate` = ?,`amount` =?,`title` =?,`description` = ?, `updtBy` = ? WHERE `id` = ?",
            [
                data?.classId,
                data?.semesterId,
                data?.startDate,
                data?.endDate,
                data?.amount,
                data?.title,
                data?.description,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a fee") : callback(null, result)
            }
        )
    },
    deleteFee: (data, id, callback) => {
        pool.query(
            "UPDATE `fee` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a fee") : callback(null, result)
            }
        )
    },
    getFeeById: (id, callback) => {
        pool.query(
            "SELECT `id`,`semesterId`, `classId`, `title`,`description`,`startDate`,`endDate`,`amount` FROM `fee` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a fee") : callback(null, result)
            }
        )
    },
    getAllFee: (data,callback) => {
        pool.query(
            "SELECT `id`,`title`,`description`,`startDate`,`endDate`,`amount` FROM `fee` WHERE `deleted` =? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a fee") : callback(null, result)
            }
        )
    }
}