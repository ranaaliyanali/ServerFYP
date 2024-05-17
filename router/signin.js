const express = require("express");
require("../DB/conn");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../model/userSchema");
const router = express.Router();

router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Please provide both email and password" });
      }
  
      const user = await Users.findOne({email});
      const isMatch = await  bycrypt.compare(password,user.password);
  
      if (!user) {
        return res.status(201).json({ message: "User not found" });
      }
      else{          
          const token = await user.generateAuthToken(user._id);
          res.status(200).json({ message: "User login successfully",
            token,
            userId: user._id.toString(),
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              phone:user.phone
      })
    }
    } catch (err) {
      console.error("Error:", err);
      return res.status(422).json({ message: "Internal Server Error" });
    }
  });




module.exports = router;
