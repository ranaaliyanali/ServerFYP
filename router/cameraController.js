const express = require('express');
require('../DB/conn');
const router = express.Router();
const Cameras = require('../model/cameraSchema');
const Users = require('../model/userSchema');


router.post('/camera', async (req, res) => {
  try {
    const { camera_name, oldcamera } = req.body;

    // Check if the camera_name field is provided
    if (!camera_name || !oldcamera) {
      return res.status(422).json({ error: "Please provide both old camera name and new camera name" });
    }

    // Check if the new camera name is already in use
    const newNameExists = await Cameras.exists({ camera_name });
    if (newNameExists) {
      return res.status(422).json({ error: "The new camera name is already in use" });
    }

    // Find the camera to update
    const existingCamera = await Cameras.findOne({ camera_name: oldcamera });
    if (!existingCamera) {
      // If a camera with the old name doesn't exist, return an error
      return res.status(404).json({ error: "Camera not found" });
    }

    // Update the camera name
    await Cameras.updateOne({ _id: existingCamera._id }, { camera_name: camera_name });
    console.log("Camera name updated");

    return res.status(201).json({ message: "Camera name updated successfully" });
  } catch (error) {
    console.error("Error updating camera name:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});





module.exports = router;
