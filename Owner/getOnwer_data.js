const mongoose = require('mongoose');
const Camera = require('../model/cameraSchema'); // Import the Camera model

const getOwner = async (req, res) => {
    try {
        const userData = req.user;
        const totalCameras = req.totalCameras; 

        // Fetch details of each camera using its ID
        const camerasDetails = [];
        for (const cameraId of userData.cameras) {
            const camera = await Camera.findById(cameraId);
            camerasDetails.push(camera);
        }

        console.log("userData", userData);
        console.log("camerasDetails", camerasDetails);

        return res.status(200).json({ userData, totalCameras, camerasDetails });
    } catch (error) {
        console.error("Error: from the owner route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getOwner;
