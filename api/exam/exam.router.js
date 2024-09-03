const { studentList,generateHallTicket,examAttendance,studentListForAttendance } = require("./exam.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { studentListValidation,generateHallTicketValidation,examAttendanceValidation,studentListForAttendanceValidation } = require("../../validation/exam/exam.validation")

router.post("/studentList", checkToken, studentListValidation, studentList)
router.post("/generateHallTicket", checkToken, generateHallTicketValidation, generateHallTicket)
router.post("/studentListForAttendance", checkToken, studentListForAttendanceValidation, studentListForAttendance)
router.post("/examAttendance", checkToken, examAttendanceValidation, examAttendance)

module.exports = router