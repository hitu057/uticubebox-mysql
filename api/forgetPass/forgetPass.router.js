const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { sendOtpValidation } = require("../../validation/forgetPass/forgetPass.validation")
const { sendOtp } = require("./forgetPass.controller")

router.post("/sendOtp", checkToken, sendOtpValidation, sendOtp)

module.exports = router