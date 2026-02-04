const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
let flash = require("express-flash");
let userMapStore = new Map();
const bcrypt = require("bcrypt");
let port = 7800;

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;
    let cleanEmail = email.trim().toLowerCase();
    if (userMapStore.has(cleanEmail)) {
      req.flash("error", "user aready have this email");
      res.redirect("/login");
    }
    let hashPassword = await bcrypt.hash(password, 10);
    userMapStore.set({
      id: Date.now(),
      name: req.body.name,
      email: email,
      password: hashPassword,
    });

    console.log("succefully added", userMapStore.get(email));
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// app.post("/login", (req, res) => {
//   let username = req.body.name;
//   const user = { name: username };
//   const userToken = jwt.sign(user, secret);
//   res.json({ userToken: userToken });
// });

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
