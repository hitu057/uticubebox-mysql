const { createRoom, updateRoom, getAllRoom, deleteRoom, getRoomById } = require("./room.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createRoomValidation, updateRoomValidation } = require("../../validation/room/room.validation")

router.post("/", checkToken, createRoomValidation, createRoom)
router.put("/:id",checkToken, updateRoomValidation, updateRoom)
router.delete("/:id",checkToken, deleteRoom)
router.get("/all",checkToken, getAllRoom)
router.get("/:id",checkToken, getRoomById)

module.exports = router