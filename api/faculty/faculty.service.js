const pool = require("../../config/database")
module.exports = {
    createFaculty: (data, callback) => {
        pool.getConnection((err, connection) => {
            if (err) return callback(err?.sqlMessage || "Error while getting database connection")
            connection.beginTransaction((err) => {
                if (err) {
                    connection.release()
                    return callback(err?.sqlMessage || "Error while starting transaction")
                }
                connection.query(
                    "SELECT `id` FROM `user` WHERE `email` = ? OR `mobile` = ?",
                    [data?.email, data?.mobile],
                    (error, results) => {
                        if (error) {
                            connection.rollback(() => {
                                connection.release()
                                return callback(error?.sqlMessage || "Error while checking for existing email or mobile")
                            })
                        } else if (results.length > 0) {
                            connection.rollback(() => {
                                connection.release()
                                return callback("Email or mobile already exists")
                            })
                        } else {
                            connection.query(
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
                                        connection.rollback(() => {
                                            connection.release()
                                            return callback(error?.sqlMessage || "Error while adding a faculty")
                                        })
                                    } else {
                                        if (result?.insertId) {
                                            connection.query(
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
                                                    if (error) {
                                                        connection.rollback(() => {
                                                            connection.release()
                                                            return callback(error?.sqlMessage || "Error while adding a faculty")
                                                        })
                                                    } else {
                                                        connection.commit((err) => {
                                                            if (err) {
                                                                connection.rollback(() => {
                                                                    connection.release()
                                                                    return callback(err?.sqlMessage || "Error while committing transaction")
                                                                })
                                                            } else {
                                                                connection.release()
                                                                return callback(null, response)
                                                            }
                                                        })
                                                    }
                                                }
                                            )
                                        } else {
                                            connection.rollback(() => {
                                                connection.release()
                                                return callback("Error while adding a faculty")
                                            })
                                        }
                                    }
                                }
                            )
                        }
                    }
                )
            })
        })
    },
    updateFaculty: (data, id, callback) => {
        pool.getConnection((err, connection) => {
            if (err) return callback(err?.sqlMessage || "Error while getting database connection")
            connection.beginTransaction((err) => {
                if (err) {
                    connection.release()
                    return callback(err?.sqlMessage || "Error while starting transaction")
                }
                connection.query(
                    "SELECT `id` FROM `user` WHERE (`email` = ? OR `mobile` = ?) AND `id` != ?",
                    [data?.email, data?.mobile, id],
                    (error, results) => {
                        if (error) {
                            connection.rollback(() => {
                                connection.release()
                                return callback(error?.sqlMessage || "Error while checking for existing email or mobile")
                            })
                        } else if (results.length > 0) {
                            connection.rollback(() => {
                                connection.release()
                                return callback("Email or mobile already exists")
                            })
                        } else {
                            const updateUserQuery = `UPDATE user SET firstname = ?, middelname = ?, lastname = ?, email = ?, ${data?.password ? 'password = ?,' : ''} mobile = ?, address = ?, gender = ?, dob = ?, updtBy = ? WHERE id = ?`
                            const updateUserParams = [
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
                            ]
                            connection.query(updateUserQuery, updateUserParams, (error, result) => {
                                if (error) {
                                    connection.rollback(() => {
                                        connection.release()
                                        return callback(error?.sqlMessage || "Error while updating a faculty")
                                    })
                                } else {
                                    connection.query(
                                        "UPDATE `faculty` SET `departmentId` = ?, `designationId` = ?, `empId` = ?, `qualificationId` = ?, `additionalResId` = ?, `roleId` = ? WHERE userId = ?",
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
                                            if (error) {
                                                connection.rollback(() => {
                                                    connection.release()
                                                    return callback(error?.sqlMessage || "Error while updating a faculty")
                                                })
                                            } else {
                                                connection.commit((err) => {
                                                    if (err) {
                                                        connection.rollback(() => {
                                                            connection.release()
                                                            return callback(err?.sqlMessage || "Error while committing transaction")
                                                        })
                                                    } else {
                                                        connection.release()
                                                        return callback(null, response)
                                                    }
                                                })
                                            }
                                        }
                                    )
                                }
                            })
                        }
                    }
                )
            })
        })
    },
    deleteFaculty: (data, id, callback) => {
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
    uploadImage: (data, id, callback) => {
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
            "SELECT u.`id` , u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`address`,u.`gender`,u.`dob`,f.`departmentId`,f.`designationId`,f.`empId`,f.`qualificationId`,f.`additionalResId`,f.`roleId`,u.`profile` FROM `user` u LEFT JOIN `faculty` f ON f.`userId` = u.`id` WHERE u.`deleted` = ? and u.`id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a faculty") : callback(null, result)
            }
        )
    },
    getAllFaculty: (data, callback) => {
        pool.query(
            "SELECT u.`id`,u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`address`,u.`gender`,u.`dob`,u.`profile`,f.`departmentId`,f.`designationId`,f.`empId`,f.`qualificationId`,f.`additionalResId`,f.`roleId` FROM `user` AS u RIGHT JOIN `faculty` AS f ON f.`userId` = u.`id` WHERE u.`deleted` = ? AND u.`orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a faculty") : callback(null, result)
            }
        )
    }
}