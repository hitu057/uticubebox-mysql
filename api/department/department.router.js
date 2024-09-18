const { createDepartment, updateDepartment, getAllDepartment, deleteDepartment, getDepartmentById } = require("./department.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createDepartmentValidation, updateDepartmentValidation } = require("../../validation/department/department.validation")

router.post("/", checkToken, createDepartmentValidation, createDepartment)
router.put("/:id",checkToken, updateDepartmentValidation, updateDepartment)
router.delete("/:id",checkToken, deleteDepartment)
router.get("/all",checkToken, getAllDepartment)
router.get("/:id",checkToken, getDepartmentById)

module.exports = router