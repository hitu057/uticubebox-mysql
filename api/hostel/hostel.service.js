const pool = require("../../config/database")

module.exports = {
    createHostel: (data, callback) => {
        pool.query(
            "INSERT INTO `hostel` (`orgId`,`name`,`warden`,`address`,`pincode`,`city`,`state`,`policy`,`emergency`,`crdtBy`) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [
                data?.orgId,
                data?.name,
                data?.warden,
                data?.address,
                data?.pincode,
                data?.city,
                data?.state,
                data?.policy,
                data?.emergency,
                data?.crdtBy
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while adding a hostel") : callback(null, result)
            }
        )
    },
    updateHostel: (data, id, callback) => {
        pool.query(
            "UPDATE `hostel` SET `name` = ?, `warden` = ?,`address` = ? , `pincode` = ?,`city`= ?,`state` = ?,`policy` = ?,`emergency` =? , `updtBy` = ? WHERE `id` = ?",
            [
                data?.name,
                data?.warden,
                data?.address,
                data?.pincode,
                data?.city,
                data?.state, ,
                data?.policy,
                data?.emergency,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while updating a hostel") : callback(null, result)
            }
        )
    },
    deleteHostel: (data, id, callback) => {
        pool.query(
            "UPDATE `hostel` SET `deleted` = ?,`updtBy` = ? WHERE `id` = ?",
            [
                process.env.DELETED,
                data?.crdtBy,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while deleting a hostel") : callback(null, result)
            }
        )
    },
    getHostelById: (id, callback) => {
        pool.query(
            "SELECT `id` , `name`, `warden`,`address`, `pincode`,`city`,`state`,`emergency`,`policy` FROM `hostel` WHERE `deleted` = ? and `id` = ?",
            [
                process.env.NOTDELETED,
                id
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a hostel") : callback(null, result)
            }
        )
    },
    getAllHostel: (data, callback) => {
        pool.query(
            "SELECT `id` , `name`, `warden`,`address`, `pincode`,`city`,`state`,`emergency`,`policy` FROM `hostel` WHERE `deleted` = ? AND `orgId` = ?",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a hostel") : callback(null, result)
            }
        )
    },
    getDashboard: (data, callback) => {
        pool.query(
            "SELECT h.`id`, h.`name` AS hostel_name, COUNT(DISTINCT r.`id`) AS total_rooms, SUM(r.`sharing`) AS total_beds, COUNT(DISTINCT CASE WHEN s.`checkIn` <= CURDATE() AND (s.`checkOut` IS NULL OR s.`checkOut` >= CURDATE()) THEN s.`id` ELSE NULL END) AS occupied_beds, (SUM(r.`sharing`) - COUNT(DISTINCT CASE WHEN s.`checkIn` <= CURDATE() AND (s.`checkOut` IS NULL OR s.`checkOut` >= CURDATE()) THEN s.`id` ELSE NULL END)) AS non_occupied_beds, COUNT(DISTINCT CASE WHEN s.`checkIn` <= CURDATE() AND (s.`checkOut` IS NULL OR s.`checkOut` >= CURDATE()) THEN s.`id` ELSE NULL END) AS total_students_with_hostel, COUNT(DISTINCT CASE WHEN s.`checkIn` <= CURDATE() AND (s.`checkOut` IS NULL OR s.`checkOut` >= CURDATE()) THEN r.`id` ELSE NULL END) AS occupied_rooms FROM `hostel` h LEFT JOIN `room` r ON h.`id` = r.`hostel` LEFT JOIN `student` s ON r.`roomNumber` = s.`roomNumber` AND s.`hostel` IS NOT NULL AND s.`checkIn` <= CURDATE() AND (s.`checkOut` IS NULL OR s.`checkOut` >= CURDATE()) WHERE h.`deleted` = ? AND h.`orgId` = ? GROUP BY h.`id`, h.`name` ORDER BY h.`name`",
            [
                process.env.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a hostel") : callback(null, result)
            }
        )
    },
    getStudentList: (id,data, callback) => {
        pool.query(
            "SELECT u.`id`, u.`firstname`, u.`middelname`, u.`lastname`, s.`roomNumber`, s.`checkIn`, s.`checkOut` FROM `student` s LEFT JOIN `user` u ON u.`id` = s.`userId` LEFT JOIN `room` r ON s.`hostel` = r.`hostel` LEFT JOIN `hostel` h ON r.`hostel` = h.`id` WHERE h.`id` = ? AND h.`deleted` = ? AND h.`orgId` = ? AND s.`checkIn` <= CURDATE() AND (s.`checkOut` IS NULL OR s.`checkOut` >= CURDATE()) GROUP BY u.`id`, u.`firstname`, u.`middelname`, u.`lastname`, s.`roomNumber`, s.`checkIn`, s.`checkOut`",
            [
                id,
                process?.env?.NOTDELETED,
                data?.orgId
            ],
            (error, result) => {
                return error ? callback(error?.sqlMessage || "Error while fetching a hostel") : callback(null, result)
            }
        )
    },
}