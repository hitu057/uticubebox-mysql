const { verify } = require("jsonwebtoken")
module.exports = {
    checkToken: (req, res, next) => {
        let token = req?.get("authorization")
        if (token) {
            token = token?.slice(7)
            verify(token, process.env.JWT_TOKEN_KEY, (err, decoded) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: "Invalid Token"
                    })
                }
                else
                    next()
            })
        }
        else {
            res.status(400).json({
                success: false,
                message: "Token required"
            })
        }
    }
}