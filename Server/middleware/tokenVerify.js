const jwt = require("jsonwebtoken");
const cookiesParser = require("cookie-parser");
const express = require("express");
const UserStorage = require("../models/storeage");
let secret = "W$q4=25*8%v-}UV";

// let router=express.Router()
const verifyToken = (req, res, next) => {
  console.log("=== verifyToken called ===");
  console.log("Cookies:", req.cookies);
   const token = req.cookies.token;
   console.log("Token value:", token);

   if (!token) {
     console.log("❌ No token found");
     return res.status(401).json({ message: "No Token found" });
   }

   try {
     let decoded = jwt.verify(token, secret);
     console.log("✅ Token verified. Decoded:", decoded);

     if (!UserStorage.get(decoded.email)) {
       console.log("❌ User not found in storage for email:", decoded.email);
       return res
         .status(401)
         .json({ message: "Token Has no match in the database" });
     }

     req.user = decoded;
     next();
   } catch (error) {
     console.table(error);
     return res.status(401).json({
       success: false,
       message: "error  when verifying the tokens",
     });
   }
};
module.exports = verifyToken;
