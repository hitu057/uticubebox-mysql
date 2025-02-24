const { createCourse, updateCourse, getAllCourse, deleteCourse, getCourseById } = require("./course.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createCourseValidation, updateCourseValidation } = require("../../validation/course/course.validation")

router.post("/", checkToken, createCourseValidation, createCourse)
router.put("/:id",checkToken, updateCourseValidation, updateCourse)
router.delete("/:id",checkToken, deleteCourse)
router.get("/all",checkToken, getAllCourse)
router.get("/:id",checkToken, getCourseById)

module.exports = router