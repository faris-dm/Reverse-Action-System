const express = require("express");
const router = express.Router();
const { z } = require("zod");
const userMapStore = require("../models/storeage");
let bcrypt = require("bcrypt");
let refreshStore = [];
let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";
let jwt = require("jsonwebtoken");
let cookiesparser = require("cookie-parser");
router.use(cookiesparser());

router.get("/login", (req, res) => {
  res.render("login", { message: null });
});

let login = z.object({
  email: z.string().email("please enter Valid email- @"),
  password: z.string().min(5, "password must be five or more"),
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let cleanEmail = email.toLowerCase();
  let foundUser = userMapStore.get(cleanEmail);
  if (!foundUser) {
    res.send("No email found  with this email");
  }

  try {
    if (await bcrypt.compare(password, foundUser.password)) {
      let user = { email: email, name: foundUser.name };

      let accessTokens = generateAccess(user);

      let RefreshTokens = jwt.sign(user, RefreshTokenSecret, {
        expiresIn: "7d",
      });

      refreshStore.push(RefreshTokens);
      console.log("login success");
      console.log(
        "accessTokens:\n",
        accessTokens,
        "\n RefreshTokens:\n",
        RefreshTokens
      );
      res.cookie("token", accessTokens, { httpOnly: true });

      // return res.redirect("/");
      return res.json({
        accessTokens: accessTokens,
        RefreshTokens: RefreshTokens,
      });
    } else console.log("incorrect password");
    return res.json("incorrect Password");
  } catch (error) {
    console.log(error);
  }
});

function generateAccess(user) {
  return jwt.sign(user, secret, { expiresIn: "15m" });
}

module.exports = router;
