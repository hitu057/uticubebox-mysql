const { createFaculty, updateFaculty, getAllFaculty, deleteFaculty, getFacultyById } = require("./faculty.controller")
const router = require("express").Router()
const { createFacultyValidation, updateFacultyValidation } = require("../../validation/faculty/faculty.validation")

router.post("/", createFacultyValidation, createFaculty)
router.put("/:id", updateFacultyValidation, updateFaculty)
router.delete("/:id", deleteFaculty)
router.get("/all", getAllFaculty)
router.get("/:id", getFacultyById)

module.exports = router