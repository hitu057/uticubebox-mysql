const { createFee, updateFee, getAllFee, deleteFee, getFeeById,addOnlinePayment, addOfflinePayment, pendingForApproval ,rejectPayment,approvePayment} = require("./fee.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createFeeValidation, updateFeeValidation,onlinePaymentValidation,offlinePaymentValidation,rejectPaymentValidation, approvePaymentValidation } = require("../../validation/fee/fee.validation")
const fileDestination = require('../../config/fileUpload')
const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']
const upload = fileDestination(process.env.PAYMENTIMAGE, allowedMimes)

router.post("/", checkToken, createFeeValidation, createFee)
router.post("/addOnlinePayment", checkToken, onlinePaymentValidation, addOnlinePayment)
router.get("/pendingForApproval", checkToken, pendingForApproval)
router.patch("/approvePayment", checkToken,approvePaymentValidation, approvePayment)
router.patch("/rejectPayment", checkToken,rejectPaymentValidation, rejectPayment)
router.put("/:id",checkToken, updateFeeValidation, updateFee)
router.delete("/:id",checkToken, deleteFee)
router.get("/all",checkToken, getAllFee)
router.get("/:id",checkToken, getFeeById)
router.post("/addOfflinePayment", checkToken, (req, res, next) => {
    const data = req?.body
    upload.single('document')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        }
        req.body.orgId = data?.orgId
        req.body.crdtBy = data?.crdtBy
        offlinePaymentValidation(req, res, next)
    })
},addOfflinePayment)

module.exports = router