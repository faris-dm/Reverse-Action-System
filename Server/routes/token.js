const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");
const UserStorage = require("../models/storeage"); // Using your Map

const RefreshTokenSecret = "W%&7=-^#-v}XL";
const secret = "W$q4=25*8%v-}UV";

function generateAccess(user) {
  return jwt.sign(user, secret, { expiresIn: "15m" });
}

router.post("/token", (req, res) => {
  // Get token from body or cookies
  const incomingToken = req.body.token || req.cookies.refreshToken;

  if (!incomingToken) {
    return res.status(401).json({ message: "No refresh Token found" });
  }

  // 1. Verify the token first
  jwt.verify(incomingToken, RefreshTokenSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    // 2. Look up the user in your UserStorage Map using the email from the token
    const userInStorage = UserStorage.get(decoded.email);

    // 3. Check if user exists AND if the token matches what you stored in the Map
    if (!userInStorage || userInStorage.refreshToken !== incomingToken) {
      return res
        .status(403)
        .json({ message: "Token not recognized or session ended" });
    }

    // 4. Everything is good! Generate a new Access Token
    const payload = {
      id: userInStorage.id,
      email: userInStorage.email,
      role: userInStorage.role, // Make sure this matches your Map key
    };

    const accessToken = generateAccess(payload);
    res.json({ success: true, accessToken });
  });
});

module.exports = router;
