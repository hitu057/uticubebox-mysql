const joi = require("@hapi/joi")
const schema = {
    createDropdown: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        name: joi.string().required(),
        groupId: joi.string().required()
    }),
    updateDropdown: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        name: joi.string().required(),
        groupId: joi.string().required()
    })
}
module.exports = schema