const multer = require('multer');
const cloudinary = require('../uploads/cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'avatar',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [
      {
        width: 200,
        height: 200,
        crop: 'limit',
        // gravity: 'face',
        crop: 'thumb',
        quality: 'auto',
      },
    ],
  
    filename: function (req, file, cb) {
      cb(undefined, file.filename);
    },
  });

const fileUpload = multer({ storage: storage });

module.exports = fileUpload;
