const jwt = require ('jsonwebtoken');
const Users = require("../model/userSchema");

const authenticateMiddleware =  async(req, res, next) =>{

    const token = req.headers["authorization"];
    if(!token){
        return res
        .status(401).json({message: "unauthorized http,token not provided"})
    }
    const jwtToken = token.replace("Bearer","").trim();

    try {

        const isVerified = jwt.verify(jwtToken,process.env.SECRET_KEY)

        const userData = await Users.findOne({email: isVerified.email}).
        select({
            password: 0,
            cpassword:0,
            isOwner:0,
        });
        // console.log("userdata", userData)
        req.user = userData;
        req.token = token;
        req.UserID = userData._id
        next();
    } catch (error) {
        return res.status(401).json({message: "unauthorized http,token not provided"})
    }
};
module.exports = authenticateMiddleware;