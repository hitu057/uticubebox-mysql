const { createSemester, updateSemester, getAllSemester, deleteSemester, getSemesterById } = require("./semester.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createSemesterValidation, updateSemesterValidation } = require("../../validation/semester/semester.validation")

router.post("/", checkToken, createSemesterValidation, createSemester)
router.put("/:id",checkToken, updateSemesterValidation, updateSemester)
router.delete("/:id",checkToken, deleteSemester)
router.get("/all",checkToken, getAllSemester)
router.get("/:id",checkToken, getSemesterById)

module.exports = router