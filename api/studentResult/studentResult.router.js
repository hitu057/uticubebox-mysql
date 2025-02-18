const { resultList,studentList } = require("./studentResult.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { resultListValidation,studentListValidation } = require("../../validation/studentResult/studentResult.validation")

router.post("/resultList", checkToken, resultListValidation, resultList)
router.post("/studentList", checkToken, studentListValidation, studentList)

module.exports = router