const express = require("express");
const router = express.Router();
const { z } = require("zod");
const userMapStore = require("../models/storeage");
let bcrypt = require("bcrypt");
let refreshStore = [];
let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";
let jwt = require("jsonwebtoken");
// let cookiesparser = require("cookie-parser");

router.get("/login", (req, res) => {
  res.render("login", { message: null });
});

let login = z.object({
  email: z.string().email("please enter Valid email- @"),
  password: z.string().min(5, "password must be five or more"),
});

router.post("/login", async (req, res) => {
  const result = login.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      err: result.error.errors.map((errors) => ({
        field: errors.path[0],
        message: errors.message,
      })),
    });
  }
  let { email, password } = result.data;
  let cleanEmail = email.toLowerCase();
  let foundUser = userMapStore.get(cleanEmail);
  if (!foundUser) {
    return res.send("No email found  with this email");
  }

  try {
    if (await bcrypt.compare(password, foundUser.password)) {
      let user = { email: email, name: foundUser.name };

      let token = generateAccess(user);

      let RefreshToken = jwt.sign(user, RefreshTokenSecret, {
        expiresIn: "7d",
      });

      foundUser.refreshToken = RefreshToken;
      userMapStore.set(cleanEmail, foundUser);
      console.log(
        "Token added succefully:",
        userMapStore.get(cleanEmail).refreshToken
      );

      refreshStore.push(RefreshToken);
      console.log("login success");
      console.log("accessToken:\n", token, "\n RefreshToken:\n", RefreshToken);
      res.cookie("token", token, { httpOnly: true });
      res.cookie("refreshToken", RefreshToken, { httpOnly: true });

      return res.redirect("/Dashboard");
      // return res.json({
      //   accessTokens: accessTokens,
      //   RefreshTokens: RefreshTokens,
      // });
    } else console.log("incorrect password");
    return res.json("incorrect Password");
  } catch (error) {
    console.log(error);
    return res.status(500).send("error happend ,check again");
  }
});

function generateAccess(user) {
  return jwt.sign(user, secret, { expiresIn: "15m" });
}

module.exports = router;
