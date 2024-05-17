const multer = require('multer');
const path = require('path');
const express = require("express");
require("../DB/conn");
const fs = require("fs")

const Users = require("../model/userSchema");

const router = express.Router();

console.log("hello")

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = `./media/${req.query.username}`;
        // Check if the directory exists, create it if not
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, uploadPath);
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer middleware
const upload = multer({ storage: storage });

// POST endpoint for uploading image
router.post('/upload_userimage', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({message:'No files were uploaded.'});
        }
        const size = await Users.findOne({ email: req.query.username });
        const profileImageCount = size.profileImage.length;
        const folderName = req.query.username;
        const fileName = req.file.filename;

        const imagePath = `media/${folderName}/${fileName}`;
        if(profileImageCount <=4)
        {
                  const user = await Users.findOneAndUpdate(
            { email: req.query.username },
            {
                $addToSet: {
                    profileImage: imagePath
                }
            },
            { new: true }
        );

       res.status(200).json({ message: "Image uploaded successful" });
        }
        else{
           res.status(200).json({ message: " your 5 images is Stored" });
        }

    } catch (err) {

        res.status(500).send('Internal server error.');
    }

});

module.exports = router;