const { createDropdown, updateDropdown, getAllDropdownByGroup, getAllDropdown, deleteDropdown, getDropdownById, getAllDropdownGroup } = require("./dropdown.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createDropdownValidation, updateDropdownValidation } = require("../../validation/dropdown/dropdown.validation")

router.post("/add", createDropdownValidation, createDropdown)
router.get("/all", getAllDropdown)
router.get("/allGroup", getAllDropdownGroup)
router.get("/allByGroup/:groupId", getAllDropdownByGroup)
router.put("/:id", updateDropdownValidation, updateDropdown)
router.delete("/:id", deleteDropdown)
router.get("/:id", getDropdownById)

module.exports = router