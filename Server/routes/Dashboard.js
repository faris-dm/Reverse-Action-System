const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");
let cookiesparser = require("cookie-parser");
router.use(cookiesparser());
const userMapStore = require("../models/storeage");

router.get("/Dashboard", (req, res) => {
  res.render("Dashboard", { message: null });
});
module.exports = router;
