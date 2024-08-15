const { createFee, updateFee, getAllFee, deleteFee, getFeeById } = require("./fee.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createFeeValidation, updateFeeValidation } = require("../../validation/fee/fee.validation")

router.post("/", checkToken, createFeeValidation, createFee)
router.put("/:id",checkToken, updateFeeValidation, updateFee)
router.delete("/:id",checkToken, deleteFee)
router.get("/all",checkToken, getAllFee)
router.get("/:id",checkToken, getFeeById)

module.exports = router