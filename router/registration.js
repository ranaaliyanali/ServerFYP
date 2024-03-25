const express = require("express");
require("../DB/conn");
const Users = require("../model/userSchema");



const router = express.Router();


router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, cpassword, phone } = req.body;

  if (!firstname || !lastname || !email || !password || !cpassword || !phone) {
    return res.status(422).json({ error: "plz filled the field" });
  }

  try {
    const userExist = await Users.findOne({ email: email });
    const phoneExist = await Users.findOne({ phone: phone });

    if (userExist) {
      console.log("hello");
      return res.status(422).json({ error: "emaill already exists" });
    } else if (phoneExist) {
      return res.status(422).json({ error: "phone already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords are not matching" });
    } else {
      const users = new Users({
        firstname,
        lastname,
        email,
        password,
        cpassword,
        phone,
      });
      await users.save();
      // console.log("users registered");

      res.status(201).json({ message: "user registered successful" });
    }
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
