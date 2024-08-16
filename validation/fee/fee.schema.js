const joi = require("@hapi/joi")
const schema = {
    createFee: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title:joi.string().required(),
        description:joi.string().required(),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        startDate:joi.date().required(),
        endDate:joi.date().required(),
        amount:joi.string().required()
    }),
    updateFee: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        title:joi.string().required(),
        description:joi.string().required(),
        classId: joi.string().required(),
        semesterId: joi.string().required(),
        startDate:joi.date().required(),
        endDate:joi.date().required(),
        amount:joi.string().required()
    }),
    onlinePayment: joi.object({
        orgId: joi.string().required(),
        crdtBy: joi.string().required(),
        transactionId:joi.string().required(),
        feeId:joi.string().required(),
        amount:joi.string().required()
    }),
}
module.exports = schema