const express = require("express");
const router = express.Router();
const { z, email, date } = require("zod");
const userMapStore = require("../models/storeage");
const bcrypt = require("bcrypt");
// const userMap = require("../models/storeage");
let secret = "W$q4=25*8%v-}UV";
let jwt = require("jsonwebtoken");
let RefreshTokenSecret = "W%&7=-^#-v}XL";
// let cookiesparser = require("cookie-parser");
// router.use(cookiesparser());

router.get("/supplier", (req, res) => {
  res.render("supplierRegistor", { message: null });
});

let signUpsupplier = z.object({
  name: z.string().min(3, "userName Must Be at least three characters "),
  email: z.string().email("pleases enter Valid email(@"),
  password: z.string().min(5, "password must be five or more"),
});

// POST /supplier – handle form submission
router.post("/supplier", async (req, res) => {
  // save logic...

  let RegistorSuppleZod = signUpsupplier.safeParse(req.body);
  if (!RegistorSuppleZod.success) {
    return res.status(400).json({
      err: RegistorSuppleZod.error.errors.map((errors) => ({
        field: errors.path[0],
        message: errors.message,
      })),
    });
  }

  let { email, password, name, businessName, confirmPassword } = req.body;
  let role = "supplier";

  try {
    if (password !== confirmPassword) {
      return res.status(400).send("Password does not match");
    }
    console.log("Password Match Correctly");

    let hashPassword = await bcrypt.hash(password, 10);
    let cleanEmail = email.toLowerCase();
    // let FoundUser = userMap.get(cleanEmail);
    if (userMapStore.has(cleanEmail)) {
      return res.status(400).send("email aready Found");
    }
    // confirmPassword = await bcrypt.hash(confirmPassword, 10);

    userMapStore.set(cleanEmail, {
      id: Date.now(),
      name: name,
      email: email,
      role: role,
      password: hashPassword,
      businessName: businessName,
    });

    let user = { email: cleanEmail, name: name, role: role };

    let token = generateAccesToken(user);

    let RefreshToken = jwt.sign(user, RefreshTokenSecret, { expiresIn: "7d" });
    res.cookie("accessTokens", token, { httpOnly: true });
    res.cookie("RefreshTokens", RefreshToken, { httpOnly: true });

    console.log("token created succefully");

    console.log("user supplier added succefully", userMapStore.get(cleanEmail));
    return res.redirect("/Dashboard");
  } catch (error) {
    console.log("error happened", error);
    return res.send("Error happens ");
  }

  //   res.redirect("/profile/complete?role=supplier");
});

function generateAccesToken(user) {
  return jwt.sign(user, secret, { expiresIn: "10m" });
}

module.exports = router;
