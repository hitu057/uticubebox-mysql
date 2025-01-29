const router = require("express").Router()
const { sendOtpValidation,verifyOtpValidation,changePassValidation } = require("../../validation/forgetPass/forgetPass.validation")
const { sendOtp,verifyOtp,changePass } = require("./forgetPass.controller")

router.post("/sendOtp", sendOtpValidation, sendOtp)
router.post("/verifyOtp", verifyOtpValidation, verifyOtp)
router.post("/changePass", changePassValidation, changePass)

module.exports = router