const { resultList } = require("./studentResult.service")
const { decrypt, encrypt } = require("../../enc_dec")
module.exports = {
    resultList: (req, res) => {
        const body = req?.body
        try {
            body.semesterId = decrypt(body?.semesterId)
            body.classId = decrypt(body?.classId)
            body.batchId = decrypt(body?.batchId)
            body.studentId = decrypt(body?.studentId)
            resultList(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                result = result.map(item => ({ ...item, id: encrypt(item?.id),departmentId:encrypt(item?.departmentId) }))
                return res.status(200).json({
                    success: true,
                    message: "Result Data",
                    result: result
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    }
}