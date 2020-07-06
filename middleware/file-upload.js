const cloudinary = require('../uploads/cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const multerUploads = (width, height) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'travel-app',
            format: async (req, file) => 'png',
            width,
            height,
            crop: 'limit',
            quality: 'auto',
        },
        public_id: (req, file) => file.public_id,
    })

    return multer({ storage: storage }).single('image')
}
module.exports = multerUploads
