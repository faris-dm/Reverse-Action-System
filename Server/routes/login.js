const express = require("express");
const router = express.Router();
const { z } = require("zod");
const UserStorage = require("../models/storeage");
let bcrypt = require("bcrypt");

let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";
let jwt = require("jsonwebtoken");
let cookiesparser = require("cookie-parser");
router.use(cookiesparser());
let token = require("./token");
router.use(token);
function generateAccess(user) {
  return jwt.sign(user, secret, { expiresIn: "15m" });
}

let login = z.object({
  email: z.string().email("please enter Valid email- @"),
  password: z.string().min(8, "password must be five or more"),
});

router.post("/api/login", async (req, res) => {
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
  let cleanEmail = email.toLowerCase().trim();
  let foundUser = UserStorage.get(cleanEmail);
  if (!foundUser) {
    return res.status(401).json({ message: "No email found with this email" });
  }

  try {
    if (await bcrypt.compare(password, foundUser.password)) {
      let user = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };

      let accessToken = generateAccess(user);

      let refreshToken = jwt.sign(
        { email: foundUser.email },
        RefreshTokenSecret,
        {
          expiresIn: "7d",
        }
      );
     

      foundUser.refreshToken = refreshToken;
      UserStorage.set(cleanEmail, foundUser);
      console.log(
        "Token added succefully:",
        UserStorage.get(cleanEmail).refreshToken
      );

      // refreshStore.push(RefreshToken);
      // console.log("login success");
      // console.log("accessToken:\n", token, "\n RefreshToken:\n", RefreshToken);
      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Login successful",role:foundUser.role });
      // return res.json({
      //   accessTokens: accessTokens,
      //   RefreshTokens: RefreshTokens,
      // });
    } else console.log("incorrect password");
    return res.status(401).json({ message: "No email found with this email" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("error happend ,check again");
  }
});

module.exports = router;
