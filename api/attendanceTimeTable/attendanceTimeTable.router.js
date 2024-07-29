const { createAttendanceTimeTable, updateAttendanceTimeTable, getAllAttendanceTimeTable, deleteAttendanceTimeTable, getAttendanceTimeTableById } = require("./attendanceTimeTable.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createAttendanceTimeTableValidation, updateAttendanceTimeTableValidation } = require("../../validation/attendanceTimeTable/attendanceTimeTable.validation")

router.post("/", checkToken, createAttendanceTimeTableValidation, createAttendanceTimeTable)
router.put("/:id",checkToken, updateAttendanceTimeTableValidation, updateAttendanceTimeTable)
router.delete("/:id",checkToken, deleteAttendanceTimeTable)
router.get("/all",checkToken, getAllAttendanceTimeTable)
router.get("/:id",checkToken, getAttendanceTimeTableById)

module.exports = router