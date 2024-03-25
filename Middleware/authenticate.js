// // const jwt = require("jsonwebtoken");

// // // const Owners = require("../model/ownerSchema");
// // const Users = require("../model/userSchema");

// // const authenticate = async (req, res, next) =>{
// //     try{
// //         console.log("78979")
// //         console.log("middlewre token ===",req)
// //         const token = req.cookies.jwtoken;
        

// //             const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
            
// //             console.log("verifytoken",verifyToken)
// //             const rootuser = await Users.findOne({_id:verifyToken._id, "tokens.token":token});
            

// //             if(!rootuser){  throw new Error('user not found')}
            
// //             req.token = token;
// //             // console.log("req.token",req.token);
// //             req.rootuser = rootuser;
// //             // console.log("req.rootuser",req.rootuser);
// //             req.userID = rootuser._id;
// //             // console.log("req,userId",req.userID)

// //             next();
// //     }catch(err){
// //      res.status(401).send("unauthorized: No token provided")   
// //     }
// // }

// // module.exports = authenticate;a
// // // module.exports = authenticate;


// const Owner = require("../model/ownerSchema");

// const getOwners = async (req, res) => {
//   try {
//     // Find all owners and populate the cameras array with camera documents
//     const owners = await Owner.find().populate('cameras');

//     // Map over owners to format the response data
//     const formattedOwners = owners.map(owner => {
//       // Count the total number of cameras for each owner
//       const totalCameras = owner.cameras.length;

//       // Extract camera numbers
//       const cameraNumbers = owner.cameras.map(camera => camera.camera_no);

//       return {
//         owner_name: owner.owner_name,
//         total_cameras: totalCameras,
//         camera_numbers: cameraNumbers
//       };
//     });

//     return res.status(200).json(formattedOwners);
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = { getOwners };
