const crypto = require("crypto")

module.exports = {
    encrypt: function (text) {
        try {
            const string = text.toString()
            const cipher = crypto.createCipheriv(process.env.ALGORITHM, process.env.SECURITYKEY, process.env.INITVECTOR)
            let encryptedData = cipher.update(string, "utf-8", "hex")
            encryptedData += cipher.final("hex")
            return encryptedData
        } catch (err) {
            return ''
        }
    },
    decrypt: function (enc_text) {
        try {
            const encTxt = enc_text.toString();
            const decipher = crypto.createDecipheriv(process.env.ALGORITHM, process.env.SECURITYKEY, process.env.INITVECTOR)
            let decryptedData = decipher.update(encTxt, "hex", "utf-8")
            decryptedData += decipher.final("utf8")
            return decryptedData
        } catch (err) {
            return ''
        }
    },
    randomePassword: function(){
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
        let password = "";
        for (let i = 0; i < 15; i++) {
            const randomIndex = crypto.randomInt(0, charset.length);
            password += charset?.[randomIndex];
        }
        return password;
    }
}