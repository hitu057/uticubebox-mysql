const { createLogBook, updateLogBook, getAllLogBook, deleteLogBook, getLogBookById} = require("./logBook.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createLogBookValidation, updateLogBookValidation } = require("../../validation/logBook/logBook.validation")

router.post("/", checkToken, createLogBookValidation, createLogBook)
router.put("/:id",checkToken, updateLogBookValidation, updateLogBook)
router.delete("/:id",checkToken, deleteLogBook)
router.get("/all",checkToken, getAllLogBook)
router.get("/:id",checkToken, getLogBookById)

module.exports = router