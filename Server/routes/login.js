const express = require("express");
const router = express.Router();
const { z } = require("zod");
const userMapStore = require("../models/storeage");
let bcrypt = require("bcrypt");

router.app.get("/login", (req, res) => {
  res.render("login", { message: null });
});
