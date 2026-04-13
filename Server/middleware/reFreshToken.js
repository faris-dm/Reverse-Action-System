const express = require("express");
const cookieParser = require("cookie-parser");
let router = express.Router();

const jwt = require("jsonwebtoken");
router.use(cookieParser());
const UserStorage = require("../models/storeage");

let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function AuthREFreshToken(req, res, next) {
  const oldRefreshtoken = req.cookies.refreshToken;


  if (!oldRefreshtoken) {
    return res.status(401).json({
      success: false,
      message: "session not found ",
    });
  }



  jwt.verify(oldRefreshtoken, RefreshTokenSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json("RefreshTokens are  EXPRED");
    }

    let storegeTokens = UserStorage.get(decoded.email);
    if (!storegeTokens) {
      return res.status(401).json("There is no this toekn in the databse");
    }

    if (storegeTokens.RefreshToken !== oldRefreshtoken) {
      return res.status(401).json("there is no similarity in the tokens");
    }
    let accessToken = jwt.sign(
      {
        id: storegeTokens.id,
        email: storegeTokens.email,
        role: storegeTokens.role,
      },
      secret,
      { expiresIn: "15m" }
    );

    let refreshToken = jwt.sign({ email: decoded.email }, RefreshTokenSecret, {
      expiresIn: "7d",
    });
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    storegeTokens.refreshToken = refreshToken;
    UserStorage.set(storegeTokens.email, storegeTokens);

    next();
  });
}

module.exports = AuthREFreshToken;
