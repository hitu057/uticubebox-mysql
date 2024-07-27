const { createFaculty, updateFaculty, getAllFaculty, deleteFaculty, getFacultyById ,uploadImage} = require("./faculty.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createFacultyValidation, updateFacultyValidation } = require("../../validation/faculty/faculty.validation")
const fileDestination = require('../../config/fileUpload')
const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']
const upload = fileDestination(process.env.USERIMAGE, allowedMimes)

router.post("/",checkToken, createFacultyValidation, createFaculty)
router.put("/:id",checkToken, updateFacultyValidation, updateFaculty)
router.delete("/:id",checkToken, deleteFaculty)
router.get("/all",checkToken, getAllFaculty)
router.get("/:id",checkToken, getFacultyById)
router.patch("/uploadImage/:id", checkToken, (req, res, next) => {
    upload.single('profile')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err
            })
        }
        uploadImage(req, res, next)
    })
})

module.exports = router