const express = require("express");
const router = express.Router();
const { z, email } = require("zod");
let userMapStore = new Map();
let bcrypt = require("bcrypt");

// GET /buyer – show buyer registration form
router.get("/buyer", (req, res) => {
  res.render("buyerRegister", { message: null });
});

let signSupplier = z.object({
  name: z.string().min(3, "Username Must Be more than Two words"),
  email: z.string().email("please enter Valid email- @"),
  password: z.string().min(5, "password must be five or more"),
});

// POST /buyer – handle buyer registration

module.exports = router;
