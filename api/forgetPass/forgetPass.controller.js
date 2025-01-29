const { sendOtp } = require("./forgetPass.service")
const nodemailer = require("nodemailer")
module.exports = {
    sendOtp: (req, res) => {
        console.log('hi')
        const body = req?.body
        try {
            sendOtp(body, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err
                    })
                }
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: body?.emailId,
                    subject: "Your OTP Code",
                    text: `Your OTP code is ${result}. It is valid for 5 minutes.`
                }
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                })
                transporter?.sendMail(mailOptions, (err, info) => {
                    if (err){
                        return res.status(400).json({
                            success: false,
                            message: "Error while sending OTP"
                        })
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: "OTP sent Successfully"
                })
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
    }
}