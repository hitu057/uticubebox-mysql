const { verifyFaculty, startAttendance,stopAttendance, manualAttendance, autoAttendance } = require("./attendance.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { verifyFacultyValidation, startAttendanceValidation,stopAttendanceValidation, manualAttendanceValidation,autoAttendanceValidation } = require("../../validation/attendance/attendance.validation")

router.post("/verifyFaculty", checkToken, verifyFacultyValidation, verifyFaculty)
router.post("/start", checkToken, startAttendanceValidation, startAttendance)
router.post("/stop", checkToken, stopAttendanceValidation, stopAttendance)
router.patch("/manual", checkToken, manualAttendanceValidation, manualAttendance)
router.patch("/auto", checkToken, autoAttendanceValidation, autoAttendance)

module.exports = router