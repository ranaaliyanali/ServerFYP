const mongoose = require('mongoose');



const adminScheme = new mongoose.Schema({

    firstname:{
        type: String,
        required: true
    },

    lastname:{
        type: String,
        required: true
    },

    email:{
        type: String,
        unique: true,
        required: true
    },

    phone:{
        type: String,
        required: true
    },
    totalcameras: [String] 
})



const Admin = mongoose.model('ADMINS',adminScheme);
module.exports = Admin;