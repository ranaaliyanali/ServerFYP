const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');



const ownerSchema = new mongoose.Schema({

    owner_name:{
        type: String,
        required: true,
    
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },


    cameras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cameras' }],


});


ownerSchema.methods.generateAuthToken = async function () {
    try {
        // Generate JWT token with owner ID and total number of cameras
        let token1 = jwt.sign({
            _id: this._id,
            email:this.email,
        }, process.env.SECRET_KEY);
        return token1;
    } catch (err) {
        console.log(err);
    }
}


const Owners = mongoose.model('OWNERS', ownerSchema);
module.exports = Owners;