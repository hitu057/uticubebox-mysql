const { createDropdown, updateDropdown, getAllDropdownByGroup, getAllDropdown, deleteDropdown, getDropdownById, getAllDropdownGroup } = require("./dropdown.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createDropdownValidation, updateDropdownValidation } = require("../../validation/dropdown/dropdown.validation")

router.post("/", checkToken, createDropdownValidation, createDropdown)
router.put("/:id",checkToken, updateDropdownValidation, updateDropdown)
router.delete("/:id",checkToken, deleteDropdown)
router.get("/all",checkToken, getAllDropdown)
router.get("/allGroup",checkToken, getAllDropdownGroup)
router.get("/allByGroup/:groupId",checkToken, getAllDropdownByGroup)
router.get("/:id",checkToken, getDropdownById)

module.exports = router