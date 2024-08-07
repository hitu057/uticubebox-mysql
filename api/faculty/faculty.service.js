const pool = require("../../config/database")
module.exports = {
    createFaculty: (data, callback) => {
        pool.query(
            "INSERT INTO `user` (`orgId`,`firstname`,`middelname`,`lastname`,`email`,`password`,`mobile`,`address`,`gender`,`dob`,`crdtBy`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.firstname,
                data?.middelname,
                data?.lastname,
                data?.email,
                data?.password,
                data?.mobile,
                data?.address,
                data?.gender,
                data?.dob,
                data?.crdtBy
            ],
            (error, result) => {
                if (error) {
                    return callback(error?.sqlMessage || "Error while adding a faculty")
                } else {
                    if (result?.insertId) {
                        pool.query(
                            "INSERT INTO `faculty` (`userId`,`departmentId`,`designationId`,`empId`,`qualificationId`,`additionalResId`,`roleId`) VALUES (?,?,?,?,?,?,?)",
                            [
                                result?.insertId,
                                data?.departmentId,
                                data?.designationId,
                                data?.empId,
                                data?.qualificationId,
                                data?.additionalResId,
                                data?.roleId
                            ],
                            (error, response) => {
                                return error ? callback(error?.sqlMessage || "Error while adding a faculty") : callback(null, response)
                            }
                        )
                    }
                }
            }
        )
    },
    updateFaculty: (data, id, callback) => {
        pool.query(
            `UPDATE user SET firstname = ?, middelname = ?, lastname = ?,email = ? ,${data?.password ? 'password = ?,' : ''} mobile = ?, address =?, gender =?, dob =?,updtBy = ? WHERE id = ?`,
            [
                data?.firstname,
                data?.middelname,
                data?.lastname,
                data?.email,
                ...(data?.password ? [data?.password] : []),
                data?.mobile,
                data?.address,
                data?.gender,
                data?.dob,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                if (error) {
                    return callback(error?.sqlMessage || "Error while updating a faculty")
                } else {
                    pool.query(
                        "UPDATE `faculty` SET `departmentId` = ?,`designationId` = ?,`empId` =? ,`qualificationId` =?,`additionalResId` =?,`roleId` =? WHERE userId = ?",
                        [
                            data?.departmentId,
                            data?.designationId,
                            data?.empId,
                            data?.qualificationId,
                            data?.additionalResId,
                            data?.roleId,
                            id
                        ],
                        (error, response) => {
                            return error ? callback(error?.sqlMessage || "Error while updating a faculty") : callback(null, response)
                        }
                    )
                }
            }
        )
    },
    deleteFaculty: (data,id, callback) => {
        pool.query(
            "UPDATE `user` SET `deleted` = ? , `updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a faculty") : callback(null, result)
            }
        )
    },
    uploadImage: (data,id, callback) => {
        pool.query(
            "UPDATE `user` SET `profile` = ? WHERE `id` = ?",
            [
                data?.profile,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a faculty") : callback(null, result)
            }
        )
    },
    getFacultyById: (id, callback) => {
        pool.query(
            "SELECT u.`id` , u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`address`,u.`gender`,u.`dob`,f.`departmentId`,f.`designationId`,f.`empId`,f.`qualificationId`,f.`additionalResId`,f.`roleId` FROM `user` u LEFT JOIN `faculty` f ON f.`userId` = u.`id` WHERE u.`deleted` = ? and u.`id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a faculty") : callback(null, result)
            }
        )
    },
    getAllFaculty: (data,callback) => {
        pool.query(
            "SELECT u.`id`,u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`profile` FROM `user` AS u RIGHT JOIN `faculty` AS f ON f.`userId` = u.`id` WHERE u.`deleted` = ? AND u.`orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a faculty") : callback(null, result)
            }
        )
    },

}