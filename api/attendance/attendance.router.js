const { verifyFaculty, startAttendance,stopAttendance, manualAttendance, autoAttendance,studentList } = require("./attendance.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { verifyFacultyValidation, startAttendanceValidation,stopAttendanceValidation, manualAttendanceValidation,autoAttendanceValidation,studentListValidation } = require("../../validation/attendance/attendance.validation")

router.post("/verifyFaculty", checkToken, verifyFacultyValidation, verifyFaculty)
router.post("/start", checkToken, startAttendanceValidation, startAttendance)
router.post("/stop", checkToken, stopAttendanceValidation, stopAttendance)
router.patch("/manual", checkToken, manualAttendanceValidation, manualAttendance)
router.patch("/auto", checkToken, autoAttendanceValidation, autoAttendance)
router.post("/studentList", checkToken, studentListValidation, studentList)

module.exports = router