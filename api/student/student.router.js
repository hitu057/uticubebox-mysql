const { createStudent, updateStudent, getAllStudent, deleteStudent, getStudentById } = require("./student.controller")
const router = require("express").Router()
const { createStudentValidation, updateStudentValidation } = require("../../validation/student/student.validation")

router.post("/", createStudentValidation, createStudent)
router.put("/:id", updateStudentValidation, updateStudent)
router.delete("/:id", deleteStudent)
router.get("/all", getAllStudent)
router.get("/:id", getStudentById)

module.exports = router