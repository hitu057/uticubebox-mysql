const router = require("express").Router()
const { sendOtpValidation,verifyOtpValidation,changePassValidation } = require("../../validation/forgetPass/forgetPass.validation")
const { sendOtp,verifyOtp,changePass,sendOtpToEmail,verifyOtpToEmail } = require("./forgetPass.controller")

router.post("/sendOtp", sendOtpValidation, sendOtp)
router.post("/sendOtpToEmail", sendOtpValidation, sendOtpToEmail)
router.post("/verifyOtp", verifyOtpValidation, verifyOtp)
router.post("/verifyOtpToEmail", verifyOtpValidation, verifyOtpToEmail)
router.post("/changePass", changePassValidation, changePass)

module.exports = router