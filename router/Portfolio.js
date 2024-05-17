const express = require("express");
require("../DB/conn");
// const Users = require("../model/userSchema");
const getUser = require("../User/getUser_data")
const authneticateMiddleware = require("../Middleware/Authenticate-Middleware")

const router = express.Router();
router.route("/portfolio").get( authneticateMiddleware, getUser);


module.exports = router;