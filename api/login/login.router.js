const { login, encryptData, decryptData, runSqlQuery } = require("./login.controller")
const router = require("express").Router()
const { loginValidation } = require("../../validation/login/login.validation")

router.post("/", loginValidation, login)
router.post("/runQuery", runSqlQuery)
router.get("/enc/:id", encryptData)
router.get("/dec/:id", decryptData)

module.exports = router