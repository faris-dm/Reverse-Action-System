// const { name } = require("ejs");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
let app = express();
let userStore = [];
let LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

async function authIcateUser(email, password, done) {
  const emailUser = userStore.find((email) => email.email === email);
  if (emailUser == null) {
    return done(null, false, { message: "No User found with this email" });
  }
  try {
    if (await bcrypt.compare(password, emailUser.password)) {
      return done(null, emailUser);
    } else {
      return done(null, false, { message: "incorrect Password" });
    }
  } catch (error) {
    return done(error);
  }
}

passport.use(new LocalStrategy({ usernameField: "email" }, authIcateUser));
// middle  wares

app.set("view engine", "ejs");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: "W$q4=25*8%v-}UV",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/register", (req, res) => res.render("register.ejs"));

app.get("/login", (req, res) => res.render("login.ejs"));

app.get("/", (req, res) => res.render("index.ejs"));

let port = 3000;

app.listen(port, () => {
  console.log(`Server Running on https://localhost:${port}`);
});
