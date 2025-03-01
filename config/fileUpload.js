const multer = require('multer')
const configureMulter = (destination, mimetype=[]) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file?.originalname);
        },
    })
    let fileFilter
    if (mimetype.length > 0) {
        fileFilter = (req, file, cb) => {
            if (mimetype.includes(file?.mimetype)) {
                cb(null, true)
            } else {
                cb(`Invalid file type. Only ${mimetype.join(' , ')} images are allowed.`)
            }
        }
    }
    else
        fileFilter = (req, file, cb) => cb(null, true)
    const upload = multer({
        storage,
        fileFilter
    });

    return upload
}
module.exports = configureMulter