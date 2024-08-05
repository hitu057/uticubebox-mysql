const { verifyFaculty, startAttendance, stopAttendance, manualAttendance, autoAttendance, studentList, verifyStudent, viewAttendance } = require("./attendance.schema")

module.exports = {
    verifyFacultyValidation: (req, res, next) => {
        try {
            const value = verifyFaculty.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    verifyStudentValidation: (req, res, next) => {
        try {
            const value = verifyStudent.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    startAttendanceValidation: (req, res, next) => {
        try {
            const value = startAttendance.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    stopAttendanceValidation: (req, res, next) => {
        try {
            const value = stopAttendance.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    manualAttendanceValidation: (req, res, next) => {
        try {
            const value = manualAttendance.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    autoAttendanceValidation: (req, res, next) => {
        try {
            const value = autoAttendance.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    studentListValidation: (req, res, next) => {
        try {
            const value = studentList.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
    viewAttendanceValidation: (req, res, next) => {
        try {
            const value = viewAttendance.validate(req?.body)
            if (value?.error) {
                res.status(400).json({
                    success: false,
                    message: value?.error?.details?.[0]?.message
                })
            }
            else
                next()
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    },
}