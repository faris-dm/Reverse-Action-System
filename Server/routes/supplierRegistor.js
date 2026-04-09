const express = require("express");
const jwt = require("jsonwebtoken");
let cookiesparser = require("cookie-parser");
let crypto = require("crypto");

const router = express.Router();
router.use(cookiesparser());
const UserStorage = require("../models/storeage");
const bcrypt = require("bcrypt");
const { ref } = require("process");
const { access } = require("fs/promises");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";

let generateAccess = (UserPayLoad) => {
  return jwt.sign(UserPayLoad, secret, { expiresIn: "15m" });
};

// Supplier registration route
router.post("/api/supplierRegistor", async (req, res) => {
  // Get data from React form
  const {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    businessName,
    businessType,
    agreementsAccepted,
  } = req.body;
  const cleanEmail = email.trim().toLowerCase();

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password confiemation filed",
    });
  }

  if (UserStorage.has(cleanEmail)) {
    return res.status(409).json({
      success: false,
      message: "User already exists. Please log in.",
    });
  }

  try {
    const HashedPassword = await bcrypt.hash(password, 10);

    let UserId = crypto.randomUUID();
    const UserPayLoad = {
      id: UserId,
      fullName: fullName,
      email: cleanEmail,
      role: "supplier",
    };

    // tokens

    let accessToken = generateAccess(UserPayLoad);
    const refreshToken = jwt.sign(UserPayLoad, RefreshTokenSecret, {
      expiresIn: "7d",
    });

    // this info is to be stoord in the  userStorage
    const NewUser = {
      id: UserId,
      fullName: fullName,
      email: cleanEmail,
      password: HashedPassword,
      phone: phone,
      businessName: businessName,
      businessType: businessType,
      role: "supplier",
      createdAt: new Date().toISOString(),
      refreshToken: refreshToken,
   
    };
    UserStorage.set(cleanEmail, NewUser);
    console.log(
      "✅ User saved with refresh token. Map size:",
      UserStorage.size
    );

    // 8. Set cookies
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    console.log(accessToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // Log all data to console
    console.log("=================================");
    console.log("Supplier Registration:");
    console.log("Name:", fullName);
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Business:", businessName);
    console.log("=================================");

    return res.status(200).json({
      message: "Registration successful,!",
      redirect: "/role",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
