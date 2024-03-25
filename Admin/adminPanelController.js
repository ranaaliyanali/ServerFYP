const mongoose = require("mongoose");
const express = require("express");
const app = express();

const Cameras = require("../model/cameraSchema");
const Users = require("../model/userSchema");
const Owners = require("../model/ownerSchema");
const Admins = require("../model/adminSchema");

const adminPanelController = async (email, camerano, req, res) => {
  try {
    // Find the owner based on the email
    
    const ownerData = await Users.findOne({ email }); 
    
    // console.log(ownerData)
    if (!ownerData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find or create the admin
    let admin = await Admins.findOne({ email });
    if (!admin) {
      // If the admin doesn't exist, create a new one
      admin = new Admins({ firstname: ownerData.firstname, lastname: ownerData.lastname, email: ownerData.email, phone: ownerData.phone });
      await admin.save();
    }

    // Check if the admin has the totalcameras property
    if (!admin.totalcameras) {
      return res.status(404).json({ message: "Totalcameras property missing for admin" });
    }

    // Check if the camera number already exists in the admin's totalcameras array
    if (admin.totalcameras.includes(camerano)) {
      return res.status(400).json({ message: "Camera number already exists for this admin" });
    }
    let owner = await Owners.findOne({ owner_name: ownerData.firstname });
    // let owner = await Owners.findOne({ owner_name: `${ownerData.firstname} ${ownerData.lastname}` });

    if (!owner) {
      // If the owner doesn't exist, create a new one
      owner = new Owners( {owner_name: ownerData.firstname, email:ownerData.email, password:ownerData.password });
      await owner.save();
    }

    // Create a new camera and save it
    const camera = new Cameras({ camera_no: camerano });
    await camera.save();

    // Update the owner's cameras array with the new camera's ObjectId
    await Owners.findOneAndUpdate({ owner_name: `${ownerData.firstname} ${ownerData.lastname}`}, { $push: { cameras: camera._id } });
    // Update the admin's totalcameras array with the new camera number
    await Admins.findOneAndUpdate({ email }, { $push: { totalcameras: camerano } });

    return res.status(201).json({ message: "Camera registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { adminPanelController };
