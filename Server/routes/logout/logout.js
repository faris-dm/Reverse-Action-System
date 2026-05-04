const express = require("express");
const UserStorage = require("../../models/storeage");
const jwt = require("jsonwebtoken");
let secret = "W$q4=25*8%v-}UV";
let bcrypt = require("bcrypt");
const router = express.Router();
let cookiesparser = require("cookie-parser");

router.use(cookiesparser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/api/logout", (req, res) => {
  let token = req.cookies.token;

  try {
    if (token) {
      const decoded = jwt.verify(token, secret);

      let User = UserStorage.get(decoded.email);
      if (User) {
        delete User.refreshToken;
        UserStorage.set(decoded.email, User);
        console.log("User Deleted succefully")
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(409).json({
      success: false,
      message: "Intrinal Server",
    });
  }

  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  console.log("Tokens Delited")

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  // ✅ Send JSON response (not redirect)
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
