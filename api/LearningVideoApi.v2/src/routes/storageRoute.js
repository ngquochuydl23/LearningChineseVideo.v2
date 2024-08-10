const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storageController');
const multer = require('multer');
const fs = require("fs");
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `./uploads`
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path)
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err);
            }

            const filename = buf.toString('hex') + path.extname(file.originalname);
            return cb(null, filename)
        })
    }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.any(), storageController.uploadFile);
router.get('/:filetype/:filename', storageController.serveFile)

module.exports = router;





