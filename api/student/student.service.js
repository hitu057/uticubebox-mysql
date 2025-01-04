const pool = require("../../config/database")
module.exports = {
    createStudent: (data, callback) => {
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
                                            return callback(error?.sqlMessage || "Error while adding a student")
                                        })
                                    } else {
                                        if (result?.insertId) {
                                            connection.query(
                                                "INSERT INTO `student` (`userId`,`categoryId`,`fatherName`,`rollNumber`,`fatherMobile`,`motherName`,`motherMobile`,`parentEmail`,`hostel`,`guardianName`,`guardianMobile`,`roomNumber`,`checkIn`,`checkOut`,`meals`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                                                [
                                                    result?.insertId,
                                                    data?.categoryId,
                                                    data?.fatherName,
                                                    data?.rollNumber,
                                                    data?.fatherMobile,
                                                    data?.motherName,
                                                    data?.motherMobile,
                                                    data?.parentEmail,
                                                    data?.hostel,
                                                    data?.guardianName,
                                                    data?.guardianMobile,
                                                    data?.roomNumber,
                                                    data?.checkIn,
                                                    data?.checkOut,
                                                    data?.meals
                                                ],
                                                (err, response) => {
                                                    if (err) {
                                                        connection.rollback(() => {
                                                            connection.release()
                                                            return callback(err?.sqlMessage || "Error while adding a student")
                                                        })
                                                    } else {
                                                        if (response?.insertId) {
                                                            connection.query(
                                                                "INSERT INTO `batch` (`userId`,`batchId`,`classId`,`semesterId`) VALUES (?,?,?,?)",
                                                                [
                                                                    result?.insertId,
                                                                    data?.batchId,
                                                                    data?.classId,
                                                                    data?.semesterId
                                                                ],
                                                                (er, res) => {
                                                                    if (er) {
                                                                        connection.rollback(() => {
                                                                            connection.release()
                                                                            return callback(er?.sqlMessage || "Error while adding a student")
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
                                                                                return callback(null, res)
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                            )
                                                        } else {
                                                            connection.rollback(() => {
                                                                connection.release()
                                                                return callback("Error while adding a student")
                                                            })
                                                        }
                                                    }
                                                }
                                            )
                                        } else {
                                            connection.rollback(() => {
                                                connection.release()
                                                return callback("Error while adding a student")
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
    updateStudent: (data, id, callback) => {
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
                                        return callback(error?.sqlMessage || "Error while updating a student")
                                    })
                                } else {
                                    connection.query(
                                        "UPDATE `student` SET `categoryId` = ?, `fatherName` = ?, `rollNumber` = ?, `fatherMobile` = ?, `motherName` = ?, `motherMobile` = ?, `parentEmail` = ?, `hostel` = ?, `guardianName` = ?, `guardianMobile` = ?, `roomNumber` = ?,`checkIn` = ? , `checkOut` =? , `meals` =? WHERE userId = ?",
                                        [
                                            data?.categoryId,
                                            data?.fatherName,
                                            data?.rollNumber,
                                            data?.fatherMobile,
                                            data?.motherName,
                                            data?.motherMobile,
                                            data?.parentEmail,
                                            data?.hostel,
                                            data?.guardianName,
                                            data?.guardianMobile,
                                            data?.roomNumber,
                                            data?.checkIn,
                                            data?.checkOut,
                                            data?.meals,
                                            id
                                        ],
                                        (err, response) => {
                                            if (err) {
                                                connection.rollback(() => {
                                                    connection.release()
                                                    return callback(err?.sqlMessage || "Error while updating a student")
                                                })
                                            } else {
                                                connection.query(
                                                    "UPDATE `batch` SET `batchId` = ?, `classId` = ?, `semesterId` = ? WHERE `userId` = ? AND `deleted` = ?",
                                                    [
                                                        data?.batchId,
                                                        data?.classId,
                                                        data?.semesterId,
                                                        id,
                                                        process?.env?.NOTDELETED
                                                    ],
                                                    (er, res) => {
                                                        if (er) {
                                                            connection.rollback(() => {
                                                                connection.release()
                                                                return callback(er?.sqlMessage || "Error while updating a student")
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
                                                                    return callback(null, res)
                                                                }
                                                            })
                                                        }
                                                    }
                                                )
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
    deleteStudent: (data, id, callback) => {
        pool.query(
            "UPDATE `user` SET `deleted` = ?,`updtBy` =? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a student") : callback(null, result)
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
    getStudentById: (id, callback) => {
        pool.query(
            "SELECT u.`id` , u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`address`,u.`gender`,u.`dob`,s.`categoryId`,s.`fatherName`,s.`rollNumber`,s.`fatherMobile`,s.`motherName`,s.`motherMobile`,s.`parentEmail`,s.`hostel`,s.`guardianName`,s.`guardianMobile`,s.`roomNumber`,b.`batchId`,b.`classId`,b.`semesterId`,u.`profile`,s.`checkIn`,s.`checkOut`,s.`meals` FROM `user` u LEFT JOIN `student` s ON s.`userId` = u.`id` LEFT JOIN `batch` b ON b.`userId` = u.`id` WHERE u.`deleted` = ? and u.`id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a student") : callback(null, result)
            }
        )
    },
    getAllStudent: (data, callback) => {
        pool.query(
            "SELECT u.`id`,u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`profile` FROM `user` AS u RIGHT JOIN `student` AS s ON s.`userId` = u.`id` WHERE u.`deleted` = ? AND u.`orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a student") : callback(null, result)
            }
        )
    }
}