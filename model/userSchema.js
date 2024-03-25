const mongoose = require('mongoose');

const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userScheme = new mongoose.Schema({

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

    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    },

    phone:{
        type: String,
        required: true
    },
    isOwner: {
        type: Boolean,
        default:false
    }

})


// we are hashing password

userScheme.pre('save', async function(next)
{
    //    console.log("hi inside");
    if(this.isModified('password')){
        this.password = await bycrypt.hash(this.password,12);
        this.cpassword = await bycrypt.hash(this.cpassword,12);
    }
    next();
});

userScheme.methods.generateAuthToken = async function (){
    try{
        let token1 = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        
        return token1;
    }catch(err){
        console.log(err);
    }
}

const Users = mongoose.model('USERS',userScheme);
module.exports = Users;
