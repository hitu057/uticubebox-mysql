const joi = require("@hapi/joi")
const schema = {
    createFaculty: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        firstname: joi.string().required(),
        middelname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        mobile: joi.number().required(),
        address: joi.string().required(),
        gender: joi.string().required(),
        dob: joi.date().required(),
        departmentId: joi.string().required(),
        designationId: joi.string().required(),
        empId: joi.string().required(),
        qualificationId: joi.string().required(),
        additionalResId: joi.string().allow('').allow(null),
        roleId: joi.string().required()
    }),
    updateFaculty: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        firstname: joi.string().required(),
        middelname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().allow('').allow(null),
        mobile: joi.number().required(),
        address: joi.string().required(),
        gender: joi.string().required(),
        dob: joi.date().required(),
        departmentId: joi.string().required(),
        designationId: joi.string().required(),
        empId: joi.string().required(),
        qualificationId: joi.string().required(),
        additionalResId: joi.string().allow('').allow(null),
        roleId: joi.string().required()
    })
}
module.exports = schema