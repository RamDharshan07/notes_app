import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import middleware from "../middleware/middleware.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPass,
    });
    await newUser.save();
     
    return res
      .status(200)
      .json({ success: true, message: "Account created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: " err on adding user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not exist" });
    }
    const checkpassword=await bcrypt.compare(password,user.password)
    if(!checkpassword)
    {
          return res.status(401).json({success:false,message:"wrong credential"})

    }
   const token =jwt.sign({id:user._id},"secretkeyofnoteapp123",{expiresIn:"5h"})
    return res
      .status(200)
      .json({ success: true, token,user:{id:user._id, name:user.name,email:user.email}, message: "Login  successfully" });
  } catch (err) {
    console.log("login error",err);
    
    return res
      .status(500)
      .json({ success: false, message: " err on login user" });
  }
});

router.get('/verify',middleware,async(req,res)=>{
  console.log("error is",req)
  return res.status(200).json({success:true,user:req.user})

})

export default router;
