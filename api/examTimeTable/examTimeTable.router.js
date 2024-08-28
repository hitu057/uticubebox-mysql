const { createExamTimeTable, updateExamTimeTable, getAllExamTimeTable, deleteExamTimeTable, getExamTimeTableById } = require("./examTimeTable.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createExamTimeTableValidation, updateExamTimeTableValidation } = require("../../validation/examTimeTable/examTimeTable.validation")

router.post("/", checkToken, createExamTimeTableValidation, createExamTimeTable)
router.put("/:id",checkToken, updateExamTimeTableValidation, updateExamTimeTable)
router.delete("/:id",checkToken, deleteExamTimeTable)
router.get("/all",checkToken, getAllExamTimeTable)
router.get("/:id",checkToken, getExamTimeTableById)

module.exports = router