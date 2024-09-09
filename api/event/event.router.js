const { createEvent, updateEvent, getAllEvent, deleteEvent, getEventById } = require("./event.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createEventValidation, updateEventValidation } = require("../../validation/event/event.validation")

router.post("/", checkToken, createEventValidation, createEvent)
router.put("/:id",checkToken, updateEventValidation, updateEvent)
router.delete("/:id",checkToken, deleteEvent)
router.get("/all",checkToken, getAllEvent)
router.get("/:id",checkToken, getEventById)

module.exports = router