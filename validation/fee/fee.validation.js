const { createFee, updateFee ,onlinePayment,offlinePayment,rejectPayment,approvePayment, studentFee} = require("./fee.schema")

module.exports = {
    createFeeValidation: (req, res, next) => {
        try {
            const value = createFee.validate(req?.body)
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
    updateFeeValidation: (req, res, next) => {
        try {
            const value = updateFee.validate(req?.body)
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
    onlinePaymentValidation: (req, res, next) => {
        try {
            const value = onlinePayment.validate(req?.body)
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
    offlinePaymentValidation: (req, res, next) => {
        try {
            const value = offlinePayment.validate(req?.body)
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
    approvePaymentValidation: (req, res, next) => {
        try {
            const value = approvePayment.validate(req?.body)
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
    rejectPaymentValidation: (req, res, next) => {
        try {
            const value = rejectPayment.validate(req?.body)
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
    studentFeeValidation: (req, res, next) => {
        try {
            const value = studentFee.validate(req?.body)
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