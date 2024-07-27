const { createStudent, updateStudent, getAllStudent, deleteStudent, getStudentById,uploadImage } = require("./student.controller")
const router = require("express").Router()
const { checkToken } = require("../../auth/token-validation")
const { createStudentValidation, updateStudentValidation } = require("../../validation/student/student.validation")
const fileDestination = require('../../config/fileUpload')
const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']
const upload = fileDestination(process.env.USERIMAGE, allowedMimes)

router.post("/",checkToken, createStudentValidation, createStudent)
router.put("/:id",checkToken, updateStudentValidation, updateStudent)
router.delete("/:id",checkToken, deleteStudent)
router.get("/all",checkToken, getAllStudent)
router.get("/:id",checkToken, getStudentById)
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