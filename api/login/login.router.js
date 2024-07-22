const { login, encryptData, decryptData } = require("./login.controller")
const router = require("express").Router()
const { loginValidation } = require("../../validation/login/login.validation")

router.post("/login", loginValidation, login)
router.get("/enc/:id", encryptData)
router.get("/dec/:id", decryptData)

module.exports = router