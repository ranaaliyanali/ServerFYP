const express = require("express");
const router = express.Router();
const getAllOwners = require("../Admin/allOnwers");
const authneticateMiddleware = require("../Middleware/Authenticate-Middleware")

// const ownerMiddleware = require("../Middleware/User-Middleware")

router.route('/owners').get( getAllOwners);

// router.route("/camera_owners").get( ownerMiddleware, getAllOwners);
module.exports = router;
