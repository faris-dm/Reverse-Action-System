const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
let cookiesparser = require("cookie-parser");
app.use(cookiesparser());
let flash = require("express-flash");
let userMapStore = new Map();
let refreshStore = [];
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const { populate } = require("dotenv");
const { token } = require("morgan");
const { use } = require("passport");
app.use(express.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
let secret = "W$q4=25*8%v-}UV";
let RefreshTokenSecret = "W%&7=-^#-v}XL";

app.get("/", (req, res) => {
  res.send("welcome to jwt Route in the second server ");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let hashPassword = await bcrypt.hash(password, 10);

    if (userMapStore.has(email)) {
      res.send("email aready  found  with this emil");
    }
    userMapStore.set(email, {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: hashPassword,
    });
    console.log("user added succefully", userMapStore.get(email));
    res.redirect("/login");
  } catch (error) {
    console.log("error happened", error);
    res.redirect("register");
  }
});

app.post("/login", async (req, res) => {
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

app.post("/token", (req, res) => {
  let authHeaderToken = req.body.token;
  if (!authHeaderToken) {
    res.status(401).send("No refresh Token found");
  } else if (!refreshStore.includes(authHeaderToken)) {
    res.status(401).send("Token does not much");
  }
  jwt.verify(authHeaderToken, RefreshTokenSecret, (err, user) => {
    if (err) return res.status(403).send("Error happend Pleases check again");
    let playload = {
      email: user.email,
      name: user.name,
    };
    let accessTokens = generateAccess(playload);
    res.json({ accessTokens: accessTokens });
  });
});

let port = 2000;
app.listen(port, () => {
  console.log(`Server Running on new  https://localhost:${port}`);
});
