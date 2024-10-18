const { resultList } = require("./studentResult.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { resultListValidation } = require("../../validation/studentResult/studentResult.validation")

router.post("/resultList", checkToken, resultListValidation, resultList)

module.exports = router