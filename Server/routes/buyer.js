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

router.post("/buyer", async (req, res) => {
  let zodSupplierSign = signSupplier.safeParse(req.body);
  if (!zodSupplierSign.success) {
    return res.json({
      err: zodSupplierSign.error.errors.map((errors) => ({
        field: errors.path[0],
        message: errors.message,
      })),
    });
  }
  // TODO: Save buyer data to database
  let { name, email, password, confirmPassword, shippingAddress } = req.body;

  try {
    //  check the  password confiramation
    if (password !== confirmPassword) {
      return res.status(403).send("Password does not match");
    }
    console.log("Password Match Correctly");

    let hashPassword = await bcrypt.hash(password, 10);
    let cleanEmail = email.toLowerCase();
    if (userMapStore.has(cleanEmail)) {
      return res.status(403).send("email aready Found");
    }
    userMapStore.set(cleanEmail, {
      id: Date.now(),
      name: name,
      email: email,
      password: hashPassword,
      shippingAddress: shippingAddress,
    });
    console.log("user supplier added succefully", userMapStore.get(cleanEmail));
    // succusess redirec to login
    return res.redirect("/login");
  } catch (error) {
    console.log("error happened", error);
    console.log("error Happens");
  }

  // After successful registration, redirect to profile completion
  //   res.redirect("/profile/complete?role=buyer");
});

module.exports = router;
