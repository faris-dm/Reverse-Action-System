const jwt =require("jsonwebtoken")
const cookiesParser=require("cookie-parser")
const express=require("express")
const UserStorage = require("../models/storeage");
let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";

// let router=express.Router()
const verifyToken=(req,res,next) =>{
    const token=req.cookies.accessToken
    if(token) {
        return res.status(401).json({
            message:"No Message found"
        })

    }
 try {
    let decoded = jwt.verify(token, secret);
    if (!UserStorage.get(decoded.email)) {
      return res
        .status(401)
        .json({ message: "Token Has No Much in the database" });
    }

    req.user = decoded;
    next();
    
 } catch (error) {
    console.table(error)
    
 }

}


