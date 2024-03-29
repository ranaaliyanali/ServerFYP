const mongoose = require('mongoose');

const Cameras = require("../model/cameraSchema");

const Users = require("../model/userSchema");
const getCameras = async (req, res) => {
    try {
        const userId = req.UserID;
        const cameras = await Cameras.find({ owner: userId });

        const usersDetails = [];
            for (const camera of cameras) {
                for (const user of camera.users) {
                    const userDetails = await Users.findById(user.user);
                    usersDetails.push(userDetails);
                }
            }

        if (!cameras) {
            return res.status(404).json({ message: "Cameras not found for this user" });
        }

        return res.status(200).json({ cameras ,usersDetails});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getCameras;
