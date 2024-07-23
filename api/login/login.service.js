const pool = require("../../config/database")

module.exports = {
    runSqlQuery: (callback) => {
        pool.query(
            `
            CREATE TABLE dropdownGroup (id INT AUTO_INCREMENT PRIMARY KEY,orgId INT NOT NULL,name VARCHAR(50) NOT NULL,deleted TINYINT NOT NULL DEFAULT 0,crdtBy INT NOT NULL,crdtDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,updtBy INT NULL,updtDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
            `,
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while running query")
                else
                    return callback(null, result)
            }
        )
    },
    login: (data, callback) => {
        pool.query(
            "SELECT `id`,`firstname`,`lastname`,`email`,`contact` FROM `teams` WHERE `email` =? and `password` =? and `status` =? and `deleted` =? LIMIT 1",
            [
                data?.email,
                data?.password,
                process.env.ACTIVE,
                process.env.NOTDELETED,
            ],
            (error, result) => {
                if (error)
                    return callback(error?.sqlMessage || "Error while login")
                else
                    return callback(null, result)
            }
        )
    }
}