const express = require("express");
require("../DB/conn");
const Users = require("../model/userSchema");
const Cameras = require("../model/cameraSchema");


const adduser = express.Router();


adduser.post('/addusers', async (req, res) => {
    try {
      const { email, camera_no } = req.body;
  
      if (!email || !camera_no) {
        return res.status(400).json({ error: "Please provide both email and camera name" });
      }
  
      // Find the user based on the provided email
      const user = await Users.findOne({ email });
      // Find the camera based on the provided camera name
      const camera = await Cameras.findOne({ camera_no: camera_no });
  
      if (user && camera) {
        // Check if the user already exists in the camera's users array
        const existingUser = await Cameras.findOne({
          _id: camera._id,
          users: { $elemMatch: { user: user._id } }
        });
  
        if (existingUser) {
          return res.status(400).json({ error: "User already exists in the camera" });
        }
  
        // Update the camera's users array to include the new user
        const updatedCamera = await Cameras.findByIdAndUpdate(
          camera._id,
          { $addToSet: { users: { user: user._id } } },
          { new: true }
        );
  
        console.log('Camera updated:', updatedCamera);
        return res.status(200).json({ message: "User added to camera successfully" });
      } else {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        if (!camera) {
          return res.status(404).json({ error: "Camera not found" });
        }
      }
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: err.message });
    }
  });
  
  
  
  
  
  
module.exports = adduser;
  
  
  
  
  