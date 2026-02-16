const express = require("express");
const router = express.Router();

// GET /buyer – show buyer registration form
router.get("/buyer", (req, res) => {
  res.render("buyerRegister", { message: null });
});

// POST /buyer – handle buyer registration
router.post("/buyer", (req, res) => {
  // TODO: Save buyer data to database
  // const { name, email, password, shippingAddress } = req.body;

  // After successful registration, redirect to profile completion
  res.redirect("/profile/complete?role=buyer");
});

module.exports = router;
