const { createCourse, updateCourse, getAllCourse, deleteCourse, getCourseById } = require("./course.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createCourseValidation, updateCourseValidation } = require("../../validation/course/course.validation")
const fileDestination = require('../../config/fileUpload')
const upload = fileDestination(process.env.COURSEIMAGE)

router.delete("/:id",checkToken, deleteCourse)
router.get("/all",checkToken, getAllCourse)
router.get("/:id",checkToken, getCourseById)
router.post("/", checkToken, (req, res, next) => {
    const data = req?.body
    upload.single('document')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        }
        req.body.orgId = data?.orgId
        req.body.crdtBy = data?.crdtBy
        createCourseValidation(req, res, next)
    })
},createCourse)

router.put("/:id", checkToken, (req, res, next) => {
    const data = req?.body
    upload.single('document')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        }
        req.body.orgId = data?.orgId
        req.body.crdtBy = data?.crdtBy
        updateCourseValidation(req, res, next)
    })
},updateCourse)

module.exports = router