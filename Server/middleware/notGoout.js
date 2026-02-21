const jwt = require("jsonwebtoken");
let express = require("express");

let secret = "W$q4=25*8%v-}UV";
function authOut(req, res, next) {
  let token = req.cookies.token;
  try {
    jwt.verify(token, secret);
    return res.redirect("/Dashboard");
  } catch (error) {
    res.clearCookie("token");
  }
  next();
}

module.exports = authOut;
