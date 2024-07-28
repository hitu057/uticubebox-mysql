const { createHoliday, updateHoliday, getAllHoliday, deleteHoliday, getHolidayById } = require("./holiday.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createHolidayValidation, updateHolidayValidation } = require("../../validation/holiday/holiday.validation")

router.post("/", checkToken, createHolidayValidation, createHoliday)
router.put("/:id",checkToken, updateHolidayValidation, updateHoliday)
router.delete("/:id",checkToken, deleteHoliday)
router.get("/all",checkToken, getAllHoliday)
router.get("/:id",checkToken, getHolidayById)

module.exports = router