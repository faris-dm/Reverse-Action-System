const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");
let cookiesparser = require("cookie-parser");
router.use(cookiesparser());
const userMapStore = require("../models/storeage");
let middleWareAuth = require("../middleware/auth");

router.get("/Dashboard", middleWareAuth, (req, res) => {
  res.render("Dashboard", { message: null });
});
module.exports = router;
