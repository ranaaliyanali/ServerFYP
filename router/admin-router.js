const express = require("express");
const router = express.Router();
const getAllOwners = require("../Admin/allOnwers");

// const ownerMiddleware = require("../Middleware/User-Middleware")

router.get('/camera_owners', getAllOwners);

// router.route("/camera_owners").get( ownerMiddleware, getAllOwners);
module.exports = router;
