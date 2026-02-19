const express = require("express");
const router = express.Router();
const { z, email } = require("zod");
const userMapStore = require("../models/storeage");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";
let cookiesparser = require("cookie-parser");
// router.use(cookiesparser());

// GET /buyer – show buyer registration form
router.get("/buyer", (req, res) => {
  res.render("buyerRegister", { message: null });
});

let signBuyer = z.object({
  name: z.string().min(3, "Username Must Be more than Two words"),
  email: z.string().email("please enter Valid email- @"),
  password: z.string().min(5, "password must be five or more"),
});

// POST /buyer – handle buyer registration

router.post("/buyer", async (req, res) => {
  let result = signBuyer.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      err: result.error.errors.map((errors) => ({
        field: errors.path[0],
        message: errors.message,
      })),
    });
  }
  // TODO: Save buyer data to database
  let { name, email, password, confirmPassword, shippingAddress } = req.body;
  let role = "buyer";

  try {
    //  check the  password confiramation
    if (password !== confirmPassword) {
      return res.status(400).send("Password does not match");
    }
    console.log("Password Match Correctly");

    let hashPassword = await bcrypt.hash(password, 10);
    let cleanEmail = email.toLowerCase();
    if (userMapStore.has(cleanEmail)) {
      return res.status(400).send("email aready Found");
    }
    userMapStore.set(cleanEmail, {
      id: Date.now(),
      name: name,
      email: email,
      role: role,
      password: hashPassword,
      shippingAddress: shippingAddress,
    });

    let user = { email: cleanEmail, name: name, role: role };

    let token = generateAccesToken(user);
    let RefreshToken = jwt.sign(user, RefreshTokenSecret, {
      expiresIn: "7d",
    });

    res.cookie("accessToken", token, { httpOnly: true });
    res.cookie("RefreshToken", RefreshToken, { httpOnly: true });

    console.log("user buyer added succefully", userMapStore.get(cleanEmail));
    // succusess redirec to login
    return res.redirect("/Dashboard");
  } catch (error) {
    console.log("error happened", error);
    return res.status(500).send("Error happens");
  }

  // After successful registration, redirect to profile completion
  //   res.redirect("/profile/complete?role=buyer");
});

function generateAccesToken(user) {
  return jwt.sign(user, secret, { expiresIn: "10m" });
}

module.exports = router;
