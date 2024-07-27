const pool = require("../../config/database")
module.exports = {
    createStudent: (data, callback) => {
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
                    return callback(error?.sqlMessage || "Error while adding a student")
                } else {
                    if (result?.insertId) {
                        pool.query(
                            "INSERT INTO `student` (`userId`,`categoryId`,`fatherName`,`rollNumber`,`fatherMobile`,`motherName`,`motherMobile`,`parentEmail`,`hostel`,`guardianName`,`guardianMobile`,`roomNumber`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
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
                                data?.roomNumber
                            ],
                            (error, response) => {
                                return error ? callback(error?.sqlMessage || "Error while adding a student") : callback(null, response)
                            }
                        )
                    }
                }
            }
        )
    },
    updateStudent: (data, id, callback) => {
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
                data?.updtBy,
                id
            ],
            (error, result) => {
                if (error) {
                    return callback(error?.sqlMessage || "Error while updating a student")
                } else {
                    pool.query(
                        "UPDATE `student` SET `categoryId` = ?,`fatherName` = ?,`rollNumber` = ?,`fatherMobile` = ?,`motherName` = ?,`motherMobile` = ?,`parentEmail` = ?,`hostel` = ?,`guardianName` = ?,`guardianMobile` = ?,`roomNumber` = ? WHERE userId = ?",
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
                            id
                        ],
                        (error, response) => {
                            return error ? callback(error?.sqlMessage || "Error while updating a student") : callback(null, response)
                        }
                    )
                }
            }
        )
    },
    deleteStudent: (data, id, callback) => {
        pool.query(
            "UPDATE `user` SET `deleted` = ?,`updtBy` =? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.updtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a student") : callback(null, result)
            }
        )
    },
    getStudentById: (id, callback) => {
        pool.query(
           "SELECT u.`id` , u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile`,u.`address`,u.`gender`,u.`dob`,s.`categoryId`,s.`fatherName`,s.`rollNumber`,s.`fatherMobile`,s.`motherName`,s.`motherMobile`,s.`parentEmail`,s.`hostel`,s.`guardianName`,s.`guardianMobile`,s.`roomNumber` FROM `user` u LEFT JOIN `student` s ON s.`userId` = u.`id` WHERE u.`deleted` = ? and u.`id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a student") : callback(null, result)
            }
        )
    },
    getAllStudent: (callback) => {
        pool.query(
           "SELECT u.`id`,u.`firstname`,u.`middelname`,u.`lastname`,u.`email`,u.`mobile` FROM `user` AS u RIGHT JOIN `student` AS s ON s.`userId` = u.`id` WHERE `deleted` = ?",
            [
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a student") : callback(null, result)
            }
        )
    }
}