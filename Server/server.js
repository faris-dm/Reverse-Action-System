// require("dotenv").config();
const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const users = [];
// let userStore = new Map();
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: "W$q4=25*8%v-}UV",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

let intilazedPassport = require("./passport");
intilazedPassport(
  passport,
  (email) => users.find((item) => item.email === email),
  (id) => users.find((item) => item.id === id)
);

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!users) {
    console.log("No match  is user in the elemnts");
  } else {
    try {
      let hashPassword = await bcrypt.hash(req.body.password, 10);
      users.push({
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });

      console.log(`succefully added`);
      console.log(` the current elements`);
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

// app.post("/login", async (req, res) => {
//   const { email, password, name } = req.body;
//   let oldUser = userStore.get(email);
//   if (!oldUser) {
//     console.log(" there is no match with this email");
//     return res.status(404).send(" there is no user with data");
//   } else {
//     try {
//       let comparehased = bcrypt.compare(password, oldUser.password);
//       if (!comparehased) {
//         console.log("wrong password");
//         res.status(404).send(" inccorect password");
//       } else {
//         console.log("correct password");
//         res.redirect("/home");
//       }
//     } catch (error) {
//       console.log("error messsage", error);
//       return res.status(500).send("error Occuiped");
//     }
//   }
// });

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).render("index.ejs", { message: "solo" });
  console.log("gone succefully");
});

app.get("/register", (req, res) => {
  res.status(200).render("register.ejs");
});
app.get("/login", (req, res) => {
  res.status(200).render("login.ejs");
});

let port = 2000;

app.listen(port, () => {
  console.log(`https://localhost:${port}`);
});
