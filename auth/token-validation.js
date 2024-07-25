const { verify, decode } = require('jsonwebtoken')
module.exports = {
    checkToken: (req, res, next) => {
        try {
            const token = req?.headers?.authorization.split(' ')[1]
            if (token) {
                const checkToken = verify(token, process.env.JWT_TOKEN_KEY)
                if (checkToken) {
                    const decodedToken = decode(token, { complete: true })
                    req.body.orgId = decodedToken?.payload?.orgId
                    req.body.crdtBy = decodedToken?.payload?.id
                    next()
                }
                else {
                    res.status(401).json({
                        status: false,
                        message: "Provide valid token"
                    })
                }
            }
            else {
                res.status(401).json({
                    status: false,
                    message: "Provide valid token"
                })
            }

        } catch (error) {
            res.status(401).json({
                status: false,
                message: "Provide valid token"
            })
        }
    }
}