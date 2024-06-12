const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // LETAK PENYIMPANAN
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },

    // NAMA FILE
    filename: function (req, file, cb) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2,'0');

        const ext = path.extname(file.originalname);
        const filename = `${year}-${month}-${hours}-${minutes}-${seconds}${ext}`;
        cb(null, filename);
    }
})

const uploadImage = multer({
    storage: storage,

    limits: {
        fileSize: 1024 * 1024 * 5
    },

    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

module.exports = uploadImage