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
                1
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
            "UPDATE `student` SET `name` = ?, `groupId` = ? WHERE `id` = ?",
            [
                data?.name,
                data?.groupId,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a student") : callback(null, result)
            }
        )
    },
    deleteStudent: (id, callback) => {
        pool.query(
            "UPDATE `user` SET `deleted` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a student") : callback(null, result)
            }
        )
    },
    getStudentById: (id, callback) => {
        pool.query(
            "SELECT `id` , `name` FROM `student` WHERE `deleted` = ? and `id` = ?",
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
            "SELECT `id` , `name`,`groupId` FROM `student` WHERE `deleted` = ?",
            [
                process.env.NOTDELETED
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a student") : callback(null, result)
            }
        )
    }
}