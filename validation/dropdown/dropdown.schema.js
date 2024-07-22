const joi = require("@hapi/joi")
const schema = {
    createDropdown: joi.object({
        name: joi.string().required(),
        groupId: joi.string().required()
    }),
    updateDropdown: joi.object({
        name: joi.string().required(),
        groupId: joi.string().required()
    })
}
module.exports = schema