const joi = require("@hapi/joi")
const schema = {
    create: joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().email().required(),
        contact: joi.number().integer().min(1000000000).message("Invalid contact").max(9999999999).message("Invalid contact").required(),
        designation: joi.string().required(),
        password: joi.string().required(),
        status: joi.string().required(),
        crdt_by: joi.string().required()
    }),
    update: joi.object({
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        email: joi.string().email().required(),
        contact: joi.number().integer().min(1000000000).message("Invalid contact").max(9999999999).message("Invalid contact").required(),
        designation: joi.string().required(),
        password: joi.string().allow('').allow(null),
        status: joi.string().required(),
        updt_by: joi.string().required()
    }),
    deleteTeam: joi.object({
        updt_by: joi.string().required()
    }),
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    }),
}
module.exports = schema