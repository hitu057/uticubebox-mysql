const { createAttendanceTimeTable, updateAttendanceTimeTable } = require("./attendanceTimeTable.schema")

module.exports = {
    createAttendanceTimeTableValidation: (req, res, next) => {
        try {
            const value = createAttendanceTimeTable.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    updateAttendanceTimeTableValidation: (req, res, next) => {
        try {
            const value = updateAttendanceTimeTable.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    }
}