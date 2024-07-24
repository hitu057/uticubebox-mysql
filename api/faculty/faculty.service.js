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
                1
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
            "UPDATE `faculty` SET `name` = ?, `groupId` = ? WHERE `id` = ?",
            [
                data?.name,
                data?.groupId,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a faculty") : callback(null, result)
            }
        )
    },
    deleteFaculty: (id, callback) => {
        pool.query(
            "UPDATE `user` SET `deleted` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a faculty") : callback(null, result)
            }
        )
    },
    getFacultyById: (id, callback) => {
        pool.query(
            "SELECT `id` , `name` FROM `faculty` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a faculty") : callback(null, result)
            }
        )
    },
    getAllFaculty: (callback) => {
        pool.query(
            "SELECT `id` , `name`,`groupId` FROM `faculty` WHERE `deleted` = ?",
            [
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a faculty") : callback(null, result)
            }
        )
    }
}