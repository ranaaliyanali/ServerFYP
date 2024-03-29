const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });
require("./DB/conn");

app.use(express.json());
app.use(require("./router/registration"));
app.use(require('./router/cameraController'));
app.use(require("./router/signin"));
const adminPanel = require("./Admin/adminPanelController");
app.use(require("./router/admin-router"))
app.use(require("./router/Portfolio"))

app.use(require("./router/cameras"))
app.use(require("./Camera_Controllers/addusers"));
app.use(require("./Camera_Controllers/deleteuser"));
const db = process.env.DATABSE;
const PORT = process.env.PORT;

app.get("/admin", (req, res) => {
  const formContent = `
    <form action="/search" method="get">
      <label for="search">email:</label>
      <input type="text" id="search" name="search" required>

      <label for="search">CameraNo:</label>
      <input type="text" id="camerano" name="camerano" required>
      <button type="submit">Submit</button>
    </form>
  `;

  // Send the form to the frontend
  res.send(formContent);
});

app.get('/search',(req, res)=>{
    const email = req.query.search;
    const camerano = req.query.camerano;
    // console.log(email);
    // console.log(camerano)
    adminPanel.adminPanelController(email,camerano, req, res);
    
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
