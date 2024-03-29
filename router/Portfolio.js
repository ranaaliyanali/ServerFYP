const express = require("express");
require("../DB/conn");
// const Users = require("../model/userSchema");
const getUser = require("../User/getUser_data")
const portfolioMiddleware = require("../Middleware/Authenticate-Middleware")

const router = express.Router();
router.route("/portfolio").get( portfolioMiddleware, getUser);


module.exports = router;