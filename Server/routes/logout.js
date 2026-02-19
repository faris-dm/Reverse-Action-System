const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  console.log("User logged out, cookies cleared");
  res.redirect("/role");
});

module.exports = router;
