const { createExamTimeTable, updateExamTimeTable } = require("./examTimeTable.schema")

module.exports = {
    createExamTimeTableValidation: (req, res, next) => {
        try {
            const value = createExamTimeTable.validate(req?.body)
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
    updateExamTimeTableValidation: (req, res, next) => {
        try {
            const value = updateExamTimeTable.validate(req?.body)
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