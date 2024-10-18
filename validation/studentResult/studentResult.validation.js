const { resultList } = require("./studentResult.schema")

module.exports = {
    resultListValidation: (req, res, next) => {
        try {
            const value = resultList.validate(req?.body)
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