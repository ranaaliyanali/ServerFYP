const mongoose = require('mongoose');



const cameraSchema = new mongoose.Schema({
    camera_no:{
        type:String,
        required: true
    },
    // camera_name:{
    //     type: String,
    //     required: false,
    
    // },
    

    users: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        
        // image:{ data:Buffer,
        //         contentType: String   }
        // Define the phone field here
    }],

})


const Cameras = mongoose.model('CAMERAS', cameraSchema);
module.exports = Cameras;
