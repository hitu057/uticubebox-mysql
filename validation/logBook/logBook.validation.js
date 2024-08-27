const { createLogBook, updateLogBook} = require("./logBook.schema")

module.exports = {
    createLogBookValidation: (req, res, next) => {
        try {
            const value = createLogBook.validate(req?.body)
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
    updateLogBookValidation: (req, res, next) => {
        try {
            const value = updateLogBook.validate(req?.body)
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