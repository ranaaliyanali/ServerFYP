const express = require("express");
require("../DB/conn");
const Users = require("../model/userSchema");
const Cameras = require("../model/cameraSchema");

const deleteuser = express.Router();

deleteuser.post('/deleteusers', async (req, res) => {
    try {
        const { email, camera_no } = req.body;

        // Find the camera by its name
        const camera = await Cameras.findOne({ camera_no });
            // console.log(camera)
        // If camera is not found, return an error
        if (!camera) {
            return res.status(404).json({ error: "Camera not found" });
        }

        // Find the user by email
        const user = await Users.findOne({ email });

        // If user is not found, return an error
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Pull the user from the users array in the camera
        await Cameras.updateOne(
    
            { _id: camera._id },// Filter criteria
            { $pull: { users: { user: user._id } } } // Update operation using $pull
        );

        return res.status(200).json({ message: "User removed from camera successfully" });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = deleteuser;
