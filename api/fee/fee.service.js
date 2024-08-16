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
            "INSERT INTO `payment` (`orgId`,`feeId`,`amount`,`transactionId`,`paymentStatus`,`crdtBy`) VALUES (?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.feeId,
                data?.amount,
                data?.transactionId,
                data?.paymentStatus,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a payment") : callback(null, result)
            }
        )
    },
    addOfflinePayment: (data, callback) => {
        pool.query(
            "INSERT INTO `payment` (`orgId`,`feeId`,`amount`,`document`,`type`,`crdtBy`) VALUES (?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.feeId,
                data?.amount,
                data?.document,
                2,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a payment") : callback(null, result)
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
            "SELECT `id`,`title`,`description`,`startDate`,`endDate`,`amount`,`classId`,`semesterId` FROM `fee` WHERE `deleted` =? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a fee") : callback(null, result)
            }
        )
    },
    studentFee: (data,callback) => {
        pool.query(
            "SELECT f.`id`,f.`title`,f.`description`,f.`startDate`,f.`endDate`,f.`amount`,COALESCE(SUM(p.`amount`), 0) AS paidAmount FROM `fee` f LEFT JOIN `payment` p ON p.`feeId` = f.`id` AND p.`paymentStatus` = ? WHERE f.`deleted` =? AND f.`orgId` = ? AND f.`classId` = ? AND f.`semesterId` =? GROUP BY f.`id`",
            [
                process.env.ACTIVE,
                process.env.NOTDELETED,
                data?.orgId,
                data?.classId,
                data?.semesterId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a student fee") : callback(null, result)
            }
        )
    },
    pendingForApproval: (data,callback) => {
        pool.query(
            "SELECT p.`id`,p.`document`,p.`amount`,f.`title`,f.`description`,f.`classId`,f.`semesterId` FROM `payment` p LEFT JOIN `fee` f ON f.`id` = p.`feeId` WHERE p.`deleted` =? AND p.`paymentStatus` = ? AND p.`type` = ? AND p.`orgId` = ?",
            [
                process.env.NOTDELETED,
                process.env.NOTDELETED,
                2,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a payment") : callback(null, result)
            }
        )
    },
    rejectPayment: (data, callback) => {
        pool.query(
            "UPDATE `payment` SET `paymentStatus` = ?,`reason` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                2,
                data?.reason,
                data?.crdtBy,
                data?.id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while rejecting payment") : callback(null, result)
            }
        )
    },
    approvePayment: (data, callback) => {
        pool.query(
            "UPDATE `payment` SET `paymentStatus` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                1,
                data?.crdtBy,
                data?.id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while approving payment") : callback(null, result)
            }
        )
    },
}