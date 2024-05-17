const mongoose = require('mongoose');



const cameraSchema = new mongoose.Schema({
    owner:{
        type:String,
        required:true
    },
    owner_name:{
        type:String,
        required: true
    },

    camera_no:{
        type:String,
        required: true
    },

    

    users: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        

    }],

})


const Cameras = mongoose.model('CAMERAS', cameraSchema);
module.exports = Cameras;
