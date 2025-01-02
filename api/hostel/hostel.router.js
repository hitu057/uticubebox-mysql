const { createHostel, updateHostel, getAllHostel, deleteHostel, getHostelById,getDashboard,getStudentList } = require("./hostel.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createHostelValidation, updateHostelValidation } = require("../../validation/hostel/hostel.validation")

router.post("/", checkToken, createHostelValidation, createHostel)
router.put("/:id",checkToken, updateHostelValidation, updateHostel)
router.delete("/:id",checkToken, deleteHostel)
router.get("/all",checkToken, getAllHostel)
router.get("/dashboard",checkToken, getDashboard)
router.get("/studentList/:id",checkToken, getStudentList)
router.get("/:id",checkToken, getHostelById)

module.exports = router