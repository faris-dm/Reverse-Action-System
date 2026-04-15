const express = require("express");
const router = express.Router();
let crypto = require("crypto");
const jwt = require("jsonwebtoken");
let cookiesparser = require("cookie-parser");
router.use(cookiesparser());
const UserStorage = require("../models/storeage");
const bcrypt = require("bcrypt");
const { success } = require("zod");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";

router.post("/api/BuyerRegistor", async (req, res) => {
  const {
    fullName,
    email,
    phone,
    password,
    confirmPassword,
    companyName,
    companyType,
    position,
    companyAddress,
    accountPurpose,
    termsAccepted,
  } = req.body;
  const cleanEmail = email.trim().toLowerCase();

  // password confiramation
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (UserStorage.has(cleanEmail)) {
    return res.status(409).json({
      success: false,
      message: "User aready exist  with similar email",
    });
  }

  try {
    const HashedBuyerPasssword = await bcrypt.hash(password, 10);
    let UserId = crypto.randomUUID();
    const BuyerPlayload = {
      id: UserId,
      email: cleanEmail,
      role: "buyer",
    };

    const UserRefreshPlayLoad = {
      email: cleanEmail,
    };

    let accessToken = jwt.sign(BuyerPlayload, secret, { expiresIn: "15m" });
    const refreshToken = jwt.sign(UserRefreshPlayLoad, RefreshTokenSecret, {
      expiresIn: "7d",
    });
    console.log("Buyer Registration:");

    const NewBuyer = {
      id: UserId,
      fullName: fullName,
      email: cleanEmail,
      phone: phone,
      password: HashedBuyerPasssword,
      companyName: companyName,
      companyType: companyType,
      position: position,
      companyAddress: companyAddress,
      accountPurpose: accountPurpose,
      role: "buyer",
      createdAt: new Date().toString(),
      refreshToken: refreshToken,
    };

    UserStorage.set(cleanEmail, NewBuyer);

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Log all data to console
    console.log("=================================");
    console.log("Buyer Registration:");
    console.log("Name:", fullName);
    console.log("email", cleanEmail);

    // Send success response
    res.status(201).json({
      message: "buyer Registration successful!",
      user: {
        id: UserId,
        email: cleanEmail,
        fullName: fullName,
        role: "buyer",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
