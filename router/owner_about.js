const express = require("express");
require("../DB/conn");
// const Users = require("../model/userSchema");
const getOwner = require("../Owner/getOnwer_data")
const ownerMiddleware = require("../Middleware/Owner-Middleware")

const router = express.Router();
router.route("/owner_about").get( ownerMiddleware, getOwner);


module.exports = router;