const express = require("express");
require("../DB/conn");
// const Users = require("../model/userSchema");
const getCameras = require("../User/getCameras")
const authneticateMiddleware = require("../Middleware/Authenticate-Middleware")


const router = express.Router();
router.route("/cameras").get( authneticateMiddleware, getCameras);

module.exports = router;