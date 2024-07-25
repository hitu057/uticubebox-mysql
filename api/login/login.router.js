const { login, encryptData, decryptData,organisation } = require("./login.controller")
const router = require("express").Router()
const { loginValidation } = require("../../validation/login/login.validation")

router.post("/", loginValidation, login)
router.get("/organisation", organisation)
router.get("/enc/:id", encryptData)
router.get("/dec/:id", decryptData)

module.exports = router