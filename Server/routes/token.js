const express = require("express");
const router = express.Router();
const { z } = require("zod");
let jwt = require("jsonwebtoken"); // ADD THIS!
let refreshStore = []; // Make sure this array exists
const userMapStore = require("../models/storeage");
const { route } = require("./supplier");
let RefreshTokenSecret = "W%&7=-^#-v}XL";
const secret = "W$q4=25*8%v-}UV";

function generateAccess(user) {
  return jwt.sign(user, secret, { expiresIn: "15m" });
}

router.post("/token", (req, res) => {
  let authHeaderToken = req.body.token;

  if (!authHeaderToken) {
    return res.status(401).send("No refresh Token found"); // Added return
  }

  // Check if token exists in refreshStore (not userMapStore)
  if (!refreshStore.includes(authHeaderToken)) {
    return res.status(401).send("Token does not match"); // Added return
  }

  jwt.verify(authHeaderToken, RefreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).send("Error happened. Please check again");
    }
    let payload = {
      email: user.email,
      name: user.name,
    };
    let accessTokens = generateAccess(payload);
    res.json({ accessTokens: accessTokens });
  });
});

module.exports = router;
