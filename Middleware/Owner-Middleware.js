const jwt = require ('jsonwebtoken');


const Owners = require("../model/ownerSchema");


const ownerMiddleware =  async(req,res,next) =>{

    const token1 = req.headers["authorization"];

    if(!token1){
        return res
        .status(401).json({message: "unauthorized http,token not provided"})
    }
    // console.log("token from auth middleware",token1)

    const jwtToken = token1.replace("Bearer","").trim();


    console.log("jwttoken from auth middleware",jwtToken)

    try {

        const isVerified = jwt.verify(jwtToken,process.env.SECRET_KEY)
        console.log("is verified",isVerified);

        const userData = await Owners.findOne({email: isVerified.email}).
        select({
            password: 0,
        });
        const totalCameras = userData.cameras.length; // Total length of cameras array
        console.log("userdata",userData)

        req.user = userData;
        req.totalCameras = totalCameras; 
        req.token1 = token1;
        req.UserID = userData._id
        next();
    } catch (error) {
        return res.status(401).json({message: "unauthorized http,token not provided"})
    }



};
module.exports = ownerMiddleware;