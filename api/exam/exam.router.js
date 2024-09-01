const { studentList,generateHallTicket,examAttendance } = require("./exam.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { studentListValidation,generateHallTicketValidation,examAttendanceValidation } = require("../../validation/exam/exam.validation")

router.post("/studentList", checkToken, studentListValidation, studentList)
router.post("/generateHallTicket", checkToken, generateHallTicketValidation, generateHallTicket)
router.post("/examAttendance", checkToken, examAttendanceValidation, examAttendance)

module.exports = router