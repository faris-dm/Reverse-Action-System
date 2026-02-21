const express = require("express");
const router = express.Router();
const { z, email } = require("zod");
let refreshStore = [];
const userMapStore = require("../models/storeage");
let RefreshTokenSecret = "W%&7=-^#-v}XL";
const secret = "W$q4=25*8%v-}UV"; //

const refreshTokenHandler = (req, res) => {
  let authHeaderToken = req.body.token;
  if (!authHeaderToken) {
    res.status(401).send("No refresh Token found");
  } else if (!userMapStore.get(authHeaderToken)) {
    res.status(401).send("Token does not much");
  }
  jwt.verify(authHeaderToken, RefreshTokenSecret, (err, user) => {
    if (err) return res.status(403).send("Error happend Pleases check again");
    let playload = {
      email: user.email,
      name: user.name,
    };
    let accessTokens = generateAccess(playload);
    res.json({ accessTokens: accessTokens });
  });
};

function generateAccess(user) {
  return jwt.sign(user, secret, { expiresIn: "15m" });
}

module.exports = refreshTokenHandler;
